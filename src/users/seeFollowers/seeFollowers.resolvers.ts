import { Resolvers } from "../../types";

const TAKE = 5;

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }, { client }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return { ok: false, error: "User not found." };
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({ take: TAKE, skip: (page - 1) * TAKE });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / TAKE),
      };
    },
  },
};

export default resolvers;
