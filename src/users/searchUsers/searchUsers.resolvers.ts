import { User } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { SearchUsersArgs } from "./searchUsers";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (
      _,
      { keyword, lastId }: SearchUsersArgs,
      { client }: Context
    ): Promise<User[]> =>
      client.user.findMany({
        where: { username: { startsWith: keyword.toLowerCase() } },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
