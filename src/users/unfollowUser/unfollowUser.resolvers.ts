import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { UnfollowUserArgs, UnfollowUserResult } from "./unFollowUser";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (
        _,
        { username }: UnfollowUserArgs,
        { client, loggedInUser }: Context
      ): Promise<UnfollowUserResult> => {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return { ok: false, error: "Can't unfollow user." };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { disconnect: { username } } },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
