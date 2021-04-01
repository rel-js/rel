import { dateTime, model } from "../../src"
import { makeServer } from "@reldb/testing"

describe("default properties", () => {
  const server = (schema) => {
    return makeServer(
      {
        schema,
      },
      {
        // log: true,
      }
    )
  }

  it("should output the right GQL type", () => {
    const { typeDefs } = server({
      Book: model({ id: false, timestamps: false }).fields({
        field: dateTime(),
      }),
    })

    expect(typeDefs).toMatch(`type Book {
  field: DateTime
}
`)
  })
})
