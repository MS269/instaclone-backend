import { Photo } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { UploadPhotoArgs } from "./uploadPhoto";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (
        _,
        { file, caption }: UploadPhotoArgs,
        { client, loggedInUser }: Context
      ): Promise<Photo> => {
        let hashtagObjs = null;
        if (caption) {
          const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
          if (hashtags) {
            hashtagObjs = hashtags.map((hashtag) => ({
              where: { hashtag },
              create: { hashtag },
            }));
          }
        }
        return client.photo.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            file,
            caption,
            ...(hashtagObjs && { hashtags: { connectOrCreate: hashtagObjs } }),
          },
        });
      }
    ),
  },
};

export default resolvers;
