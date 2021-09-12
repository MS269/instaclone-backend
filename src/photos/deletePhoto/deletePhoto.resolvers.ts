import { Context, MutationResponse, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { DeletePhotoArgs } from "./deletePhoto";

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectedResolver(
      async (
        _,
        { id }: DeletePhotoArgs,
        { client, loggedInUser }: Context
      ): Promise<MutationResponse> => {
        const photo = await client.photo.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!photo) {
          return { ok: false, error: "Photo not found." };
        } else if (photo.userId !== loggedInUser.id) {
          return { ok: false, error: "Not authorized." };
        }
        await client.photo.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
