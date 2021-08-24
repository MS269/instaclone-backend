import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { FollowUserArgs, FollowUserResult } from "./followUser";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (
        _,
        { username }: FollowUserArgs,
        { client, loggedInUser }: Context
      ): Promise<FollowUserResult> => {
        const ok = await client.user.findFirst({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return { ok: false, error: "That user does not exist." };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { connect: { username } } },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
