// Following a global types definition file like how the TypeScript team uses: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts

export enum Direction {
  IN = "IN",
  OUT = "OUT",
}

export type Field = {
  _gqlName: string
  _required: boolean
  _guard: string
}

export type MetaFields = {
  id?: boolean
  timestamps?: boolean
}

export type Fields = MetaFields & {
  [key: string]: Field
}

export type Model = {
  fields: Fields
  relations: Relations
  accessors: Accessors
  mutators: Mutators
}

export type Mutator = {
  guard?: string
  after?: (obj: object) => Promise<void>
}

export type Mutators = {
  create?: Mutator | boolean
  update?: Mutator | boolean
  delete?: Mutator | boolean
}

export type RelationFrom = {
  label: string
  params?: (any) => object
}

export type RelationTo = {
  label: string
  params?: (any) => object
}

export type Rel = {
  label: string
  direction?: Direction
}

export type Relation = {
  from: RelationFrom
  to: RelationTo
  rel: Rel
  direction?: Direction
  singular?: boolean
  order?: string
}

export type Relations = {
  [key: string]: Relation
}

export type Accessors = {
  find?: boolean
  list?: boolean
}

export type Schema =
  | {}
  | {
      [name: string]: Model
    }

export type Directives = {
  [name: string]: {
    schema: string
    handler: (next, src, args, context) => void
  }
}

export type Extensions = {
  // [name: string]: {
  //   schema: string
  //   handler: (obj, params, context) => Promise<ResolvableObject>
  // }
}

export type ResolvableObject = {
  [key: string]: any
}

export type ResolvableParams = {
  [key: string]: any
}

export type Resolver = (...RuntimeParams) => ResolvableObject
export type Resolvers =
  | {}
  | {
      [name: string]: Resolver
    }

export type RuntimeAuthUser = {
  id: string
  name: string
}

export type RuntimeContext = {
  authUser?: RuntimeAuthUser
}

export type RuntimeParams = [
  obj: ResolvableObject,
  params: ResolvableParams,
  context: RuntimeContext
]

export type Module = {
  schema: Schema
  resolvers?: Resolvers
  directives?: Directives
}

export type CallableModule = (/* @todo - this should take some JIT params */) => Module

export type RuntimeTypes = {
  [name: string]: object
}

export type RuntimeInputs = {
  [name: string]: object
}

export type RuntimeResolvers = {}

export type RuntimeDirectives = {
  [name: string]: {
    schema: string
    handler: (next, src, args, context) => void
  }
}

export type Runtime = {
  types?: RuntimeTypes
  inputs?: RuntimeInputs
  directives?: RuntimeDirectives
  resolvers?: RuntimeResolvers
}
