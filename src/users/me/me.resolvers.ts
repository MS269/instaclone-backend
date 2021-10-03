import { Prisma, User } from ".prisma/client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    me: protectedResolver(
      (
        _,
        __,
        { client, loggedInUser }
      ): Prisma.Prisma__UserClient<User | null> =>
        client.user.findUnique({ where: { id: loggedInUser.id } })
    ),
  },
};

export default resolvers;
