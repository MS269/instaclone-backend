import { Context, Resolvers } from "../../types";
import { SeeFollowersArgs, SeeFollowersResult } from "./seeFollowers";

const TAKE = 5;

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (
      _,
      { username, page }: SeeFollowersArgs,
      { client }: Context
    ): Promise<SeeFollowersResult> => {
      const ok = await client.user.findFirst({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return { ok: false, error: "User not found." };
      }
      if (page < 1) {
        page = 1;
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({ take: TAKE, skip: (page - 1) * TAKE });
      const totalFollowers: number = await client.user.count({
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
