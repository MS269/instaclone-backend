import { Room } from ".prisma/client";
import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeRooms: protectedResolver(
      async (_, __, { client, loggedInUser }: Context): Promise<Room[]> =>
        client.room.findMany({
          where: { users: { some: { id: loggedInUser.id } } },
        })
    ),
  },
};

export default resolvers;
