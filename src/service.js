const authors = [
  {
    id: 1,
    name: "Michael Crichton",
    birthDate: "23 October 1942"
  },
  {
    id: 2,
    name: "J.K. Rowling",
    birthDate: "31 July 1965"
  },
  {
    id: 3,
    name: "George R. R. Martin",
    birthDate: "20 September 1948"
  },
  {
    id: 4,
    name: "Stephen King",
    birthDate: "21 September 1947"
  },
  {
    id: 5,
    name: "George Orwell"
  },
  {
    id: 6,
    name: "J.R.R. Tolkien",
    birthDate: "3 January 1892"
  },
  {
    id: 7,
    birthDate: "6 January 1992"
  }
];

const books = [
  {
    id: 1,
    title: "Harry Potter and the Philosphers Stone",
    genres: ["Fantasy"],
    publicationDate: "26 June 1997",
    authorId: 2
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    genres: ["Fantasy"],
    authorId: 2
  },
  {
    id: 3,
    title: "Jurassic Park",
    genres: ["Science Fiction"],
    publicationDate: "20 November 1990",
    authorId: 1
  },
  {
    id: 3,
    title: "The Great Gatsby",
    genres: ["Tragedy"],
    publicationDate: "10 April 1925"
  },
  {
    id: 4,
    title: "A Game of Thrones",
    genres: ["Fantasy"],
    publicationDate: "1 August 1996",
    authorId: 3
  },
  {
    id: 5,
    title: "The Hobbit",
    genres: ["Fantasy"],
    publicationDate: "21 September 1937",
    authorId: 5
  },
  {
    id: 6,
    title: "1984",
    genres: ["Dystopian Fiction"],
    publicationDate: "8 June 1949",
    authorId: 4
  }
];

exports.findAllBooks = () => {
  return books;
};
exports.findBookById = id => {
  return books.find(book => book.id === id);
};
exports.findBookByTitle = title => {
  return books.find(book => book.title === title);
};
exports.findAllAuthors = () => {
  return authors;
};

exports.findAutherById = id => {
  return authors.find(auther => auther.id === id);
};

exports.findBooksByAuthorId = id => {
  return books.filter(book => book.authorId === id);
};
