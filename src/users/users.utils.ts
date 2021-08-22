import { User } from ".prisma/client";
import jwt from "jsonwebtoken";
import client from "../client";
import { Context, Resolver } from "../types";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToken) {
      const user: User = await client.user.findUnique({
        where: { id: verifiedToken.id },
      });
      if (user) {
        return user;
      }
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  };
