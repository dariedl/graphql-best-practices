import { findBookById, findAllBooks, findAuthorById, findAllAuthors, findBooksByAuthorId, createBook, findBooksByGenre } from "./service";
import { PubSub } from "apollo-server";
const pubsub = new PubSub();
const BOOK_CREATED = "BOOK_CREATED";

export default {
  Query: {
    bookById: (obj, args, context, info) => findBookById(args.id),
    booksByGenre: (obj, args, context, info) => findBooksByGenre(args.genre),
    allBooks: (obj, args, context, info) => findAllBooks(),
    authorById: (obj, args, context, info) => findAuthorById(args.id),
    allAuthors: (obj, args, context, info) => findAllAuthors(),
  },
  // Field Resolvers -------------------------------------------------------
  Book: {
    author: (obj, args, context, info) => findAuthorById(obj.authorId),
    genre: (obj, args, context, info) => "deprecated",
  },
  Author: {
    books: (obj, args, context, info) => findBooksByAuthorId(obj.id),
  },
  //------------------------------------------------------------------------
  Mutation: {
    createBook: (obj, args, context, info) => {
      const book = createBook(args.input);
      pubsub.publish(BOOK_CREATED, { bookCreated: book });
      return book;
    },
  },
  //------------------------------------------------------------------------
  Subscription: {
    bookCreated: {
      subscribe: (obj, args, context, info) => pubsub.asyncIterator([BOOK_CREATED]),
    },
  },
};
