import { Photo } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { parseHashtags } from "../photos.utils";
import { UploadPhotoArgs } from "./uploadPhoto";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (
        _,
        { file, caption }: UploadPhotoArgs,
        { client, loggedInUser }: Context
      ): Promise<Photo> => {
        let hashtagObjs = [];
        if (caption) {
          hashtagObjs = parseHashtags(caption);
        }
        return client.photo.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            file,
            caption,
            ...(hashtagObjs.length > 0 && {
              hashtags: { connectOrCreate: hashtagObjs },
            }),
          },
        });
      }
    ),
  },
};

export default resolvers;
