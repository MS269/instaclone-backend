import { Photo, PrismaPromise } from "@prisma/client";
import { Context, Resolvers } from "../../types";
import { SearchPhotosArgs } from "./searchPhotos";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: (
      _,
      { keyword }: SearchPhotosArgs,
      { client }: Context
    ): PrismaPromise<Photo[]> =>
      client.photo.findMany({
        where: { caption: { contains: keyword } },
      }),
  },
};

export default resolvers;
