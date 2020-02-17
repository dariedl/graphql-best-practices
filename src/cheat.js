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
  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  type Book {
    id: Int!
    title: String!
    publicationDate: String
    genre: String @deprecated(reason: "Use `newField`.")
    genres: [String]
    author: Author
  }
  type Author {
    id: Int!
    name: String
    books: [Book]
    birthDate: String
  }

  type Query {
    allBooks: [Book!]!
    bookById(id: Int!): Book!
    bookByTitle(title: String): Book
    authorById(id: Int!): Author
    allAuthors: [Author!]
  }
`;

exports.resolvers = {
  Query: {
    allBooks: (parent, args, context, info) => findAllBooks(),
    bookById: (parent, args, context, info) => findBookById(args.id),
    bookByTitle: (parent, args, context, info) => findBooksByTitle(args.title),
    authorById: (parent, args, context, info) => findAutherById(args.id),
    allAuthors: (parent, args, context, info) => findAllAuthors()
  },
  Book: {
    author(parent, args, context, info) {
      return findAutherById(parent.authorId);
    }
  },
  Author: {
    books(parent) {
      return findBooksByAuthorId(parent.id);
    }
  }
};

/*
fragment BookGenre on Book {
  title
  genres
}


*/
