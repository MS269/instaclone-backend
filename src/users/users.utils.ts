import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import client from "../client";
import { Context, Resolver } from "../types";
import { ProtectedResolverResponse } from "./users";

export const getUser = async (token: any): Promise<User | undefined> => {
  try {
    if (!token) {
      return undefined;
    }
    const verifiedToken: any = jwt.verify(token, process.env.SECRET_KEY || "");
    if ("id" in verifiedToken) {
      const user: User | null = await client.user.findUnique({
        where: { id: verifiedToken.id },
      });
      if (user) {
        return user;
      }
    } else {
      return undefined;
    }
  } catch {
    return undefined;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) =>
  (
    root: any,
    args: any,
    context: Context,
    info: any
  ): Resolver | ProtectedResolverResponse => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
