import { gql } from "apollo-server-express";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      username: String
      email: String
      password: String
      firstName: String
      lastName: String
      bio: String
      avatar: Upload
    ): EditProfileResult!
  }
`;
