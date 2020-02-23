const { gql } = require("apollo-server");
const {
  findBookById,
  findAllBooks,
  findBooksByAuthorId,
  findBookByTitle,
  findAutherById,
  findAllAuthors,
  createBook
} = require("./service");

exports.typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    publicationDate: String
    genres: [String]
    author: Author
  }
  type Author {
    id: ID!
    name: String
    books: [Book]
    birthDate: String
  }

  type Query {
    allBooks: [Book!]!
    bookById(id: ID!): Book!
    bookByTitle(title: String): Book
    allAuthors: [Author!]
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

exports.resolvers = {
  Query: {
    allBooks: (parent, args, context, info) => findAllBooks(),
    bookById: (parent, args, context, info) => findBookById(args.id),
    bookByTitle: (parent, args, context, info) => findBookByTitle(args.title),
    authorById: (parent, args, context, info) => findAutherById(args.id),
    allAuthors: (parent, args, context, info) => findAllAuthors()
  },
  Mutation: {
    createBook: (parent, args, context, info) => createBook(args.input)
  },
  Book: {
    author: (parent, args, context, info) => findAutherById(parent.authorId)
  },
  Author: {
    books: (parent, args, context, info) => findBooksByAuthorId(parent.id)
  },
  CreateBookOutput: {
    author: (parent, args, context, info) => findAutherById(parent.authorId)
  }
};
