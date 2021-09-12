import { Comment } from ".prisma/client";
import { Context, Resolvers } from "../types";

const resolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }: Comment, _, { loggedInUser }: Context): boolean =>
      userId === loggedInUser?.id,
  },
};

export default resolvers;
