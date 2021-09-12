import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowingResponse {
    ok: Boolean!
    error: String
    following: [User]
  }

  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResponse
  }
`;
