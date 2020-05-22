import DataLoader from "dataloader";
import { batchFindBooksByIds, batchFindAuthorsByIds, executeQueries, batchFindBooksByAuthorIds } from "./service";

export const loadConfig = () => ({});

export const resolvers = {
  Query: {
    bookById: async (obj, args, context, info) => {},
    authorById: async (obj, args, context, info) => {},
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
