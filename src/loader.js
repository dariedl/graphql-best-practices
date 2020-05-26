import DataLoader from "dataloader";
import { batchFindBooksByIds, batchFindAuthorsByIds, executeQueries, batchFindBooksByAuthorIds } from "./service";

export const loadConfig = () => ({
  books: new DataLoader(async (bookIds) => batchFindBooksByIds(bookIds)),
  authors: new DataLoader(async (authorIds) => batchFindAuthorsByIds(authorIds)),
  queries: new DataLoader(async (queries) => executeQueries(queries)),
  booksByAuthors: new DataLoader(async (authorIds) => batchFindBooksByAuthorIds(authorIds)),
});

export const resolvers = {
  Query: {
    bookById: async (obj, args, context, info) => context.dataloaders.books.load(args.id),
    authorById: async (obj, args, context, info) => context.dataloaders.authors.load(args.id),
    allBooks: async (obj, args, context, info) => {
      const books = await context.dataloaders.queries.load("allBooks");
      books.forEach((book) => context.dataloaders.books.prime(book.id, book));
      return books;
    },
    allAuthors: async (obj, args, context, info) => {
      const authors = await context.dataloaders.queries.load("allAuthors");
      authors.forEach((author) => context.dataloaders.authors.prime(author.id, author));
      return authors;
    },
  },
  Book: {
    author: async (obj, args, context, info) => {
      throw new Error();
    },
  },
  Author: {
    books: async (obj, args, context, info) => {
      const books = await context.dataloaders.booksByAuthors.load(obj.id);
      books.forEach((book) => context.dataloaders.books.prime(book.id, book));
      return books;
    },
  },
};
