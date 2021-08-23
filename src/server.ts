require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import http from "http";
import logger from "morgan";
import client from "./client";
import schema from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    },
  });
  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  app.use(logger("dev"));
  server.applyMiddleware({ app });
  app.use("/static", express.static("uploads"));

  http.createServer(app).listen(PORT);
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
