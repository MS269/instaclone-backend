import { protectedResolver } from "../users.utils";

const resolvers = {
  Query: {
    seeProfile: protectedResolver((_, { username }, { client }) =>
      client.user.findUnique({ where: { username } })
    ),
  },
};

export default resolvers;
