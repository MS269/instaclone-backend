import { Hashtag, Photo, Prisma, PrismaPromise, User } from "@prisma/client";
import { Context, Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: (
      { userId }: Photo,
      _,
      { client }: Context
    ): Prisma.Prisma__UserClient<User | null> =>
      client.user.findUnique({ where: { id: userId } }),

    hashtags: (
      { id }: Photo,
      _,
      { client }: Context
    ): PrismaPromise<Hashtag[]> =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
  },
};

export default resolvers;
