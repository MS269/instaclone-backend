import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { SeeProfileArgs } from "./seeProfile";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver(
      (_, { username }: SeeProfileArgs, { client }: Context): any =>
        client.user.findUnique({
          where: { username },
          // include: { followers: true, following: true },
        })
    ),
  },
};

export default resolvers;
