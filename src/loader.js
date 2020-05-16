import DataLoader from "dataloader";
import { batchFindBooksByIds, batchFindAuthorsByIds, executeQueries, batchFindBooksByAuthorIds, findAllAuthors } from "./service";

export const loadConfig = () => ({
  books: new DataLoader(async (bookIds) => batchFindBooksByIds(bookIds)),
  authors: new DataLoader(async (authorIds) => batchFindAuthorsByIds(authorIds)),
  queries: new DataLoader(async (queries) => executeQueries(queries)),
  booksByAuthors: new DataLoader(async (authorIds) => batchFindBooksByAuthorIds(authorIds)),
});

export const resolvers = {
  Query: {
    bookById: (obj, args, context, info) => context.dataloaders.books.load(args.id),
    authorById: (obj, args, context, info) => context.dataloaders.authors.load(args.id),
    allAuthors: async (obj, args, context, info) => {
      const allAuthors = await context.dataloaders.queries.load("allAuthors");
      allAuthors.forEach((author) => context.dataloaders.authors.prime(author.id, author));
      return allAuthors;
    },
    allBooks: async (obj, args, context, info) => {
      const allBooks = await context.dataloaders.queries.load("allBooks");
      allBooks.forEach((book) => context.dataloaders.authors.prime(book.id, book));
      return allBooks;
    },
  },
  Book: {
    author: async (obj, args, context, info) => context.dataloaders.authors.load(obj.authorId),
  },
  Author: {
    books: async (obj, args, context, info) => {
      return context.dataloaders.booksByAuthors.load(obj.id);
    },
  },
};
