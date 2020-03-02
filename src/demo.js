const { gql } = require("apollo-server");
const {
  findBookById,
  findAllBooks,
  findBooksByAuthorId,
  findBookByTitle,
  findAutherById,
  findAllAuthors,
  findBooks,
  findBooksByYear,
  createBook
} = require("./service");

const typeDefs = gql`
  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  type Book {
    id: ID!
    title: String!
    publicationDate: String
    genre: String @deprecated(reason: "Use genres instead")
    genres: [String!]!
    author: Author
  }
  type Author {
    id: ID!
    name: String
    books: [Book!]!
    birthDate: String
  }

  type Query {
    allBooks: [Book!]!
    books(id: ID, genre: String, year: Int): [Book]
      @deprecated(reason: "Use other queries instead instead")
    bookById(id: ID!): Book!
    bookByTitle(title: String!): Book
    bookByYear(year: Int!): Book
    allAuthors: [Author!]!
    authorById(id: ID!): Author
  }

  input CreateBookInput {
    title: String!
    publicationDate: String
    genres: [String]
    authorId: ID
  }

  type CreateBookOutput {
    title: String!
    publicationDate: String
    genres: [String]
    author: Author
  }

  type Mutation {
    createBook(input: CreateBookInput!): CreateBookOutput
  }
`;

const resolvers = {
  Query: {
    allBooks: (parent, args, context, info) => findAllBooks(),
    books: (parent, args, context, info) => findBooks(args),
    bookById: (parent, args, context, info) => findBookById(args.id),
    bookByTitle: (parent, args, context, info) => findBookByTitle(args.title),
    bookByYear: (parent, args, context, info) => findBooksByYear(args.year),
    authorById: (parent, args, context, info) => findAutherById(args.id),
    allAuthors: (parent, args, context, info) => findAllAuthors()
  },
  Mutation: {
    createBook: (parent, args, context, info) => createBook(args.input)
  },
  Book: {
    genre: (parent, args, context, info) => parent.genres[0] || "",
    author: (parent, args, context, info) => findAutherById(parent.authorId)
  },
  Author: {
    books: (parent, args, context, info) => findBooksByAuthorId(parent.id)
  },
  CreateBookOutput: {
    author: (parent, args, context, info) => findAutherById(parent.authorId)
  }
};

module.exports = { typeDefs, resolvers };
