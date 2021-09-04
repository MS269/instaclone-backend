import { Hashtag, Prisma } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { SeeHashtagArgs } from "./seeHashtag";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: (
      _,
      { hashtag }: SeeHashtagArgs,
      { client }: Context
    ): Prisma.Prisma__HashtagClient<Hashtag | null> =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};

export default resolvers;
