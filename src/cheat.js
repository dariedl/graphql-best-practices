
/*

directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  type Book {
    id: Int!
    title: String!
    publicationDate: String
    genre: String @deprecated(reason: "Use genres.")
    genres: [String]
    author: Author
  }

fragment BookGenre on Book {
  title
  genres
}


query foo($bookid: Int!) {
  bookById(id: $bookid) {
    title
  }
}
{
  "bookid":  1
}


*/
