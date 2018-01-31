const schema = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

module.exports = schema;
