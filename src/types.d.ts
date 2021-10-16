import { PrismaClient, User } from "@prisma/client";

export interface Context {
  client: PrismaClient;
  loggedInUser: User;
}

export interface Resolver {
  (root: any, args: any, context: Context, info: any): any;
}

export interface Resolvers {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export interface MutationResponse {
  ok: boolean;
  id?: number;
  error?: string;
}
