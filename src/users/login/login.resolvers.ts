import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "../../types";

export default {
  Mutation: {
    login: async (_, { username, password }: any, { client }: Context) => {
      const user: User = await client.user.findFirst({ where: { username } });
      if (!user) {
        return { ok: false, error: "User not found." };
      }
      const passwordOk: boolean = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return { ok: false, error: "Incorrect password." };
      }
      const token: string = await jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY
      );
      return { ok: true, token };
    },
  },
};
