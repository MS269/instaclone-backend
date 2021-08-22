import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver((_, { username }: any, { client }: Context) =>
      client.user.findUnique({
        where: { username },
        // include: { followers: true, following: true },
      })
    ),
  },
};

export default resolvers;
