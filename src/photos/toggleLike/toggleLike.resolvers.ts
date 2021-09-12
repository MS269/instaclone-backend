import { Context, MutationResponse, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { ToggleLikeArgs } from "./toggleLike";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (
        _,
        { id }: ToggleLikeArgs,
        { client, loggedInUser }: Context
      ): Promise<MutationResponse> => {
        const photo = await client.photo.findUnique({ where: { id } });
        if (!photo) {
          return { ok: false, error: "Photo not found." };
        }
        const like = await client.like.findUnique({
          where: { photoId_userId: { userId: loggedInUser.id, photoId: id } },
        });
        if (like) {
          await client.like.delete({
            where: { photoId_userId: { userId: loggedInUser.id, photoId: id } },
          });
        } else {
          await client.like.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              photo: { connect: { id: photo.id } },
            },
          });
        }
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
