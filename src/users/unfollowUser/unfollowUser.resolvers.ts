import { User } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }: any, { client, loggedInUser }: Context) => {
        const ok: User = await client.user.findUnique({
          where: { username },
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
