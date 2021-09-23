import { Photo } from "@prisma/client";
import { uploadToS3 } from "../../shared/shared.utils";
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
        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        return client.photo.create({
          data: {
            user: { connect: { id: loggedInUser.id } },
            file: fileUrl,
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
