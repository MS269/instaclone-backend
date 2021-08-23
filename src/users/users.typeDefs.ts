import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    username: String!
    email: String!
    firstName: String!
    lastName: String
    bio: String
    avatar: String
    followers: [User]
    following: [User]
  }
`;
