import DataLoader from "dataloader";
import { batchFindBooksByIds, batchFindAuthorsByIds, executeQueries } from "./service";

export const loadConfig = () => ({
  books: new DataLoader(async (ids) => batchFindBooksByIds(ids)),
  authors: new DataLoader(async (ids) => batchFindAuthorsByIds(ids)),
  queries: new DataLoader(async (queries) => executeQueries(queries)),
});

export const resolvers = {
  Query: {
    bookById: (obj, args, context, info) => {},
    allAuthors: async (obj, args, context, info) => {},
  },
  Book: {
    author: async (obj, args, context, info) => {},
  },
  Author: {
    books: async (obj, args, context, info) => {},
  },
};
