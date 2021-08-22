import { protectedResolver } from "../users.utils";

export default {
  Query: {
    seeProfile: protectedResolver((_, { username }, { client }) =>
      client.user.findUnique({ where: { username } })
    ),
  },
};
