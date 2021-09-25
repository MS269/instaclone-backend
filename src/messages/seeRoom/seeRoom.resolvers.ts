import { Prisma, Room } from ".prisma/client";
import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { SeeRoomArgs } from "./seeRoom";

const resolvers: Resolvers = {
  Query: {
    seeRoom: protectedResolver(
      (
        _,
        { id }: SeeRoomArgs,
        { client, loggedInUser }: Context
      ): Prisma.Prisma__RoomClient<Room | null> =>
        client.room.findFirst({
          where: { id, users: { some: { id: loggedInUser.id } } },
        })
    ),
  },
};

export default resolvers;
