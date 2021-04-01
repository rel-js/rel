import { resolveNode } from "../models/node"

import { cypherListRelationship } from "@reldb/cypher"
import { Resolver } from "@reldb/types"

import { ResolvedRel, resolveRel } from "./rel"

export function listRelationResolver(relation: ResolvedRel): Resolver {
  const { from, to, rel, singular = false, order } = relation

  return async (runtime) => {
    const fromResolved = resolveNode("from", from, runtime, {
      // always default the from to be the current object
      params: ({ obj }) => ({ id: obj.id }),
    })
    const toResolved = resolveNode("to", to, runtime)
    const relResolved = resolveRel(rel)

    return cypherListRelationship(fromResolved, toResolved, relResolved, {
      singular,
      order,
    })
  }
}
