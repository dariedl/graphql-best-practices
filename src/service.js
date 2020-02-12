const authors = [
  {
    id: 1,
    name: "Michael Crichton"
  },
  {
    id: 2,
    name: "J.K. Rowling"
  },
  {
    id: 3,
    name: "George R. R. Martin"
  }
];

const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    authorId: 2
  },
  {
    id: 2,
    title: "Jurassic Park",
    authorId: 1
  },
  {
    id: 3,
    title: "A Game of Thrones",
    author: 3
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
exports.getAllBooks = () => {
  return books;
};

//---------------------------

exports.findAutherById = id => {
  return authors.find(auther => auther.id === id);
};

exports.findBooksByAuthorId = id => {
  return books.filter(book => book.authorId === id);
};
