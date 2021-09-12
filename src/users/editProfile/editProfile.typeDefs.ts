import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      username: String
      email: String
      password: String
      firstName: String
      lastName: String
      bio: String
      avatar: Upload
    ): MutationResponse!
  }
`;
