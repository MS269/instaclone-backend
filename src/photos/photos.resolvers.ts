import { Hashtag, Photo, Prisma, PrismaPromise, User } from "@prisma/client";
import { Context, Resolvers } from "../types";
import { HashtagPhotosArgs } from "./photos";

const TAKE = 5;

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

    likes: ({ id }: Photo, _, { client }: Context): PrismaPromise<number> =>
      client.like.count({ where: { photoId: id } }),
  },

  Hashtag: {
    photos: (
      { id }: Hashtag,
      { page }: HashtagPhotosArgs,
      { client }: Context
    ): PrismaPromise<Photo[]> =>
      client.hashtag
        .findUnique({ where: { id } })
        .photos({ take: TAKE, skip: (page - 1) * TAKE }),

    totalPhotos: (
      { id }: Hashtag,
      _,
      { client }: Context
    ): PrismaPromise<number> =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
};

export default resolvers;
