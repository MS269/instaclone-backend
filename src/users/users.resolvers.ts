import { PrismaPromise, User } from "@prisma/client";
import { Context, Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowers: (
      { id }: User,
      _,
      { client }: Context
    ): PrismaPromise<number> =>
      client.user.count({ where: { following: { some: { id } } } }),

    totalFollowing: (
      { id }: User,
      _,
      { client }: Context
    ): PrismaPromise<number> =>
      client.user.count({ where: { followers: { some: { id } } } }),

    isMe: ({ id }: User, _, { loggedInUser }: Context): boolean => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },

    isFollowing: async (
      { id }: User,
      _,
      { client, loggedInUser }: Context
    ): Promise<boolean> => {
      if (!loggedInUser) {
        return false;
      }
      const exists: number = await client.user.count({
        where: { id: loggedInUser.id, following: { some: { id } } },
      });
      return Boolean(exists);
    },
  },
};

export default resolvers;
