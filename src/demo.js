const { gql } = require("apollo-server");
const {
  findBookById,
  findAllBooks,
  findBooksByAuthorId,
  findBooksByTitle,
  findAutherById,
  findAllAuthors
} = require("./service");

//--------------------------------------------

exports.typeDefs = gql`
  type Book {
    title: String!
    publicationDate: String
    author: Author
  }
  type Author {
    name: String!
    books: [Book]
  }

  type Query {
    books: [Book]
    allBooks: [Book!]!
    book(id: Int!): Book
    bookById(id: Int!): Book!
    bookByTitle(title: String!): Book
    author(id: Int!): Author
    authorById(id: Int!): Author!
    allAuthors: [Author]!
  }
`;

exports.resolvers = {
  Query: {
    books: (root, args, context, info) => findAllBooks(),
    allBooks: (root, args, context, info) => findAllBooks(),
    book: (root, args, context, info) => findBookById(args.id),
    bookById: (root, args, context, info) => findBookById(args.id),
    bookByTitle: (root, args, context, info) => findBooksByTitle(args.title),
    author: (root, args, context, info) => findAutherById(args.id),
    authorById: (root, args, context, info) => findAutherById(args.id),
    allAuthors: (root, args, context, info) => findAllAuthors()
  },
  Book: {
    author(root, args, context, info) {
      return findAutherById(root.authorId);
    }
  },
  Author: {
    books(root) {
      return findBooksByAuthorId(root.id);
    }
  }
};
