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
`;
