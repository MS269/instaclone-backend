import { User } from ".prisma/client";
import { Context, Resolvers } from "../../types";
import { SeePhotoLikesArgs } from "./seePhotoLikes";

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (
      _,
      { id }: SeePhotoLikesArgs,
      { client }: Context
    ): Promise<User[]> => {
      const likes = await client.like.findMany({
        where: { photoId: id },
        select: { user: true },
      });
      return likes.map((like) => like.user);
    },
  },
};

export default resolvers;
