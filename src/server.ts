import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server-express";
import express from "express";
import { execute, subscribe } from "graphql";
import { graphqlUploadExpress } from "graphql-upload";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import logger from "morgan";
import client from "./client";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import { PORT } from "./constants";

const startServer = async () => {
  const app = express();

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: async ({ token }: any) => {
        if (!token) {
          throw new Error("You can't listen.");
        }
        return {
          client,
          loggedInUser: await getUser(token),
        };
      },
    },
    { server: httpServer }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    context: async ({ req }) => {
      return {
        client,
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });

  await server.start();

  app.use(graphqlUploadExpress());
  app.use(logger("dev"));
  server.applyMiddleware({ app });
  app.use("/static", express.static("uploads"));

  httpServer.listen(PORT, () =>
    console.log(
      `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startServer();
