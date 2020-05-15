const { gql } = require("apollo-server");

export const typeDefs = gql`
  type Query {
    bookById(id: ID!): Book!
    booksByGenre(genre: String!): [Book]!
    allBooks: [Book!]!
    authorById(id: ID!): Author!
    allAuthors: [Author]!
  }

  type Author {
    id: ID!
    name: String
    birthDate: String
    books: [Book!]
  }

  type Book {
    id: ID!
    title: String!
    author: Author
    type: String
    genres: [String!]
    genre: String @deprecated(reason: "Use genres instead")
  }

  directive @deprecated(reason: String = "No longer supported") on FIELD_DEFINITION

  # ----------------------------------------

  type Mutation {
    createBook(input: CreateBookInput!): CreateBookOutput
  }

  input CreateBookInput {
    title: String!
    type: String
    genres: [String]
  }

  type CreateBookOutput {
    id: ID!
    mutationId: ID!
    title: String!
    type: String
    genres: [String]
  }

  # ----------------------------------------

  type Subscription {
    bookCreated: CreateBookOutput
  }
`;
