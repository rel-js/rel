import { type } from "../fields"
import { ENDPOINTS, CreateMutator, Fields } from "@reldb/types"
import { cypher, cypher1, cypherCreate } from "@reldb/cypher"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: CreateMutator, fields: Fields) {
  return async (runtime) => {
    const { params } = runtime
    const { input } = params

    // @todo validation

    const values = await resolveFieldsForCreate(label, fields, input)

    // @todo we need to split this logic into a models format
    // ie instead of:
    //   await cypherCreate(...)
    // it should be:
    //   await models[label].create(...)
    // Models should contain the fields/resolvers -> cypher mapping

    const created = await cypherCreate(label, values)
    if (mutator.after) {
      await mutator.after(created)
    }

    return created
  }
}

export async function resolveFieldsForCreate(
  label: string,
  fields: Fields,
  input
) {
  let values = {}

  for (const field of Object.entries(fields)) {
    const [fieldName, fieldDef] = field
    if (fieldDef._default) {
      if (typeof fieldDef._default === "function") {
        values[fieldName] = await fieldDef._default({
          label,
          fieldName,
          values: input,
          cypher,
          cypher1,
        })
      } else {
        values[fieldName] = await fieldDef._default
      }
    } else {
      values[fieldName] = input[fieldName]
    }
  }

  return values
}

export function createEndpoints(
  label: string,
  mutator: boolean | CreateMutator,
  fields: Fields
) {
  if (!mutator) return null

  let _mutator = {
    ...DEFAULT_MUTATOR,
    ...(typeof mutator === "boolean" ? {} : mutator),
  }

  const { guard } = _mutator

  return {
    [`Create${label}`]: {
      target: ENDPOINTS.MUTATOR,
      params: { input: type(`${label}Input`).required() },
      guard,
      returns: type(label),
      resolver: makeResolver(label, _mutator, fields),
    },
  }
}
