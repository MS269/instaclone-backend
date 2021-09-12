import { Comment, PrismaPromise } from ".prisma/client";
import { Context, Resolvers } from "../../types";
import { SeePhotoCommentsArgs } from "./seePhotoComments";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: (
      _,
      { id }: SeePhotoCommentsArgs,
      { client }: Context
    ): PrismaPromise<Comment[]> =>
      client.comment.findMany({
        where: { photoId: id },
        orderBy: { createdAt: "asc" },
      }),
  },
};

export default resolvers;
