import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String
    ): CreateAccountResult!
  }
`;
