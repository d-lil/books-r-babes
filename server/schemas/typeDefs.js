const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    password: String
    savedBooks: [Book]
  }


  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String 
    link: String
  }

  input BookInput {
    authors: [String]
    description: String
    bookId: ID!
    title: String
    image: String 
    link: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    getUser(username: String!): User
    saveBook(bookInfo: BookInput): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;