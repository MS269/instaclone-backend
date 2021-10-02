import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context, Resolvers } from "../../types";
import { LoginArgs, LoginResponse } from "./login";

const resolvers: Resolvers = {
  Mutation: {
    login: async (
      _,
      { username, password }: LoginArgs,
      { client }: Context
    ): Promise<LoginResponse> => {
      const user = await client.user.findUnique({
        where: { username },
        select: { id: true, password: true },
      });
      if (!user) {
        return { ok: false, error: "User not found." };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return { ok: false, error: "Incorrect password." };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || "");
      return { ok: true, token };
    },
  },
};

export default resolvers;
