import { Photo, Prisma } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { SeePhotoArgs } from "./seePhoto";

const resolvers: Resolvers = {
  Query: {
    seePhoto: (
      _,
      { id }: SeePhotoArgs,
      { client }: Context
    ): Prisma.Prisma__PhotoClient<Photo | null> =>
      client.photo.findUnique({ where: { id } }),
  },
};

export default resolvers;
