import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Context } from "../../types";
import { RoomUpdatesArgs } from "./roomUpdates";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async (
        root: any,
        args: RoomUpdatesArgs,
        context: Context,
        info: any
      ) => {
        const { id } = args;
        const { client, loggedInUser } = context;
        const room = await client.room.findFirst({
          where: { id, users: { some: { id: loggedInUser.id } } },
          select: { id: true },
        });
        if (!room) {
          throw new Error("You shall not see this.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async (
            { roomUpdates },
            { id },
            { loggedInUser }
          ): Promise<boolean> => {
            if (roomUpdates.roomId !== id) {
              return false;
            }
            const room = await client.room.findFirst({
              where: { id, users: { some: { id: loggedInUser.id } } },
              select: { id: true },
            });
            if (!room) {
              return false;
            }
            return true;
          }
        )(root, args, context, info);
      },
    },
  },
};
