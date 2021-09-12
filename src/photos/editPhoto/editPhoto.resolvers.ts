import { Context, MutationResponse, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { parseHashtags } from "../photos.utils";
import { EditPhotoArgs } from "./editPhoto";

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (
        _,
        { id, caption }: EditPhotoArgs,
        { client, loggedInUser }: Context
      ): Promise<MutationResponse> => {
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { hashtags: { select: { hashtag: true } } },
        });
        if (!oldPhoto) {
          return { ok: false, error: "Photo not found." };
        }
        await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: parseHashtags(caption),
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
