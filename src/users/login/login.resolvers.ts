import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context, Resolvers } from "../../types";
import { LoginArgs, LoginResult } from "./login";

const resolvers: Resolvers = {
  Mutation: {
    login: async (
      _,
      { username, password }: LoginArgs,
      { client }: Context
    ): Promise<LoginResult> => {
      const user = await client.user.findFirst({
        where: { username },
        select: { id: true, password: true },
      });
      if (!user) {
        return { ok: false, error: "User not found." };
      }
      const passwordOk: boolean = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return { ok: false, error: "Incorrect password." };
      }
      const token: string = jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY || ""
      );
      return { ok: true, token };
    },
  },
};

export default resolvers;
