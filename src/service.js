import { authors, books } from "./data";

const log = (name, ...args) => console.log("Executing:", name, ...args);

export function findAllBooks() {
  log(findAllBooks.name);
  return books;
}
export function findBookById(id) {
  log(findBookById.name, id);
  return books.find((book) => book.id === id);
}
export function findAllAuthors() {
  log(findAllAuthors.name);
  return authors;
}
export function findAuthorById(id) {
  log(findAuthorById.name, id);
  return authors.find((author) => author.id === id);
}

export function findBooksByAuthorId(id) {
  log(findBooksByAuthorId.name, id);
  return books.filter((book) => book.authorId === id);
}

export function findBooksByGenre(genre) {
  log(findBooksByGenre.name, genre);
  const isEmpty = (arr) => !arr || arr.length === 0;
  return books.filter((book) => (isEmpty(book.genres) ? false : book.genres.indexOf(genre) !== -1));
}

export function findAuthorByBookId(bookId) {
  log(findAuthorsByBookId.name, bookId);
  const book = books.find((book) => book.id === bookId);
  return authors.find((author) => author.id === book.authorId);
}

// Mutations methods ----------------------
let counter = 0;
export function createBook(book) {
  log(createBook.name, JSON.stringify(book));
  const newId = books.length.toString();
  const newbook = { id: newId, ...book };
  books.push(newbook);
  return { ...newbook, mutationId: "mID-" + ++counter };
}

// Batch methods ---------------------
export function batchFindBooksByIds(ids) {
  log(batchFindBooksByIds.name, ...ids);
  return ids.map((id) => books.find((book) => book.id === id));
}
export function batchFindAuthorsByIds(ids) {
  log(batchFindAuthorsByIds.name, ...ids);
  return ids.map((id) => authors.find((author) => author.id === id));
}

export function executeQueries(queries) {
  return queries.map((query) => {
    if (query === "allauthors") {
      return findAllAuthors();
    } else if (query === "allbooks") {
      return findAllBooks();
    } else {
      return [];
    }
  });
}
