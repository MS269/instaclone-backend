import { Context, Resolvers } from "../../types";
import { SeeFollowingArgs, SeeFollowingResult } from "./seeFollowing";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (
      _,
      { username, lastId }: SeeFollowingArgs,
      { client }: Context
    ): Promise<SeeFollowingResult> => {
      const ok = await client.user.findFirst({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return { ok: false, error: "User not found." };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return { ok: true, following };
    },
  },
};

export default resolvers;
