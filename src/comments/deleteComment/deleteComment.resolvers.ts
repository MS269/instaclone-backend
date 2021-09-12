import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { DeleteCommentArgs, DeleteCommentResult } from "./deleteComment";

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (
        _,
        { id }: DeleteCommentArgs,
        { client, loggedInUser }: Context
      ): Promise<DeleteCommentResult> => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) {
          return { ok: false, error: "Comment not found." };
        } else if (comment.userId !== loggedInUser.id) {
          return { ok: false, error: "Not authorized." };
        }
        await client.comment.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
