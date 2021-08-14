import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID!
    createdAt: String!
    updatedAt: String!
    username: String!
    email: String!
    firstName: String!
    lastName: String
  }

  type Query {
    seeProfile(username: String!): User
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String
    ): User
  }
`;
