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
    bookById: (obj, args, context, info) => {},
    authorById: (obj, args, context, info) => {},
    allBooks: async (obj, args, context, info) => {},
    allAuthors: async (obj, args, context, info) => {},
  },
  Book: {
    author: async (obj, args, context, info) => {},
  },
  Author: {
    books: async (obj, args, context, info) => {},
  },
};
