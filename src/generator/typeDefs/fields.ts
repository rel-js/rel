import { Fields } from "~/types"

type Opts = {
  guards?: boolean
}

export function generateFields(fields: Fields, opts: Opts = {}) {
  const { guards = true } = opts
  const gqlFields = []

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj

    const fieldDef = [name, ": ", def._gqlName]
    if (def._required) fieldDef.push("!")
    if (guards && def._guard) fieldDef.push(` @${def._guard}`)

    gqlFields.push(fieldDef.join(""))
  })

  return gqlFields.join("\n")
}
