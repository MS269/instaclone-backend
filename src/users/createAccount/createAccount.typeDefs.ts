import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String
    ): MutationResponse!
  }
`;
