import { Message, Prisma, PrismaPromise, Room, User } from ".prisma/client";
import { Context, Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    users: ({ id }: Room, _, { client }: Context): PrismaPromise<User[]> =>
      client.room.findUnique({ where: { id } }).users(),
    messages: (
      { id }: Room,
      _,
      { client }: Context
    ): PrismaPromise<Message[]> =>
      client.message.findMany({ where: { roomId: id } }),
    unreadTotal: async (
      { id }: Room,
      _,
      { client, loggedInUser }: Context
    ): Promise<number> => {
      if (!loggedInUser) {
        return 0;
      }
      return await client.message.count({
        where: {
          read: false,
          roomId: id,
          user: { id: { not: loggedInUser.id } },
        },
      });
    },
  },

  Message: {
    user: (
      { id }: Message,
      _,
      { client }: Context
    ): Prisma.Prisma__UserClient<User | null> =>
      client.message.findUnique({ where: { id } }).user(),
  },
};

export default resolvers;
