import { Photo, PrismaPromise } from ".prisma/client";
import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver(
      (_, __, { client, loggedInUser }: Context): PrismaPromise<Photo[]> =>
        client.photo.findMany({
          where: {
            OR: [
              { user: { followers: { some: { id: loggedInUser.id } } } },
              { userId: loggedInUser.id },
            ],
          },
          orderBy: { createdAt: "desc" },
        })
    ),
  },
};

export default resolvers;
