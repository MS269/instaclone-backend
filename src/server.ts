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

const PORT: string | number = process.env.PORT || 4000;

const startServer = async () => {
  const app = express();

  const httpServer = createServer(app);

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
      if (req) {
        return {
          client,
          loggedInUser: await getUser(req.headers.token),
        };
      }
    },
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  await server.start();
  app.use(graphqlUploadExpress());
  app.use(logger("dev"));
  app.use("/static", express.static("uploads"));
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () =>
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startServer();
