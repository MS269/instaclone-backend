import { Context, MutationResponse, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { CreateCommentArgs } from "./createComment";

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (
        _,
        { photoId, payload }: CreateCommentArgs,
        { client, loggedInUser }: Context
      ): Promise<MutationResponse> => {
        const ok = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });
        if (!ok) {
          return { ok: false, error: "Photo not found." };
        }
        const newComment = await client.comment.create({
          data: {
            payload,
            photo: { connect: { id: photoId } },
            user: { connect: { id: loggedInUser.id } },
          },
        });
        return { ok: true, id: newComment.id };
      }
    ),
  },
};

export default resolvers;
