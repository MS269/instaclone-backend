import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { Context, Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password, firstName, lastName }: any,
      { client }: Context
    ) => {
      const existingUser: User = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
      });
      if (existingUser) {
        return { ok: false, error: "This username/email is already taken." };
      }
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const newUser: User = await client.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          firstName,
          lastName,
        },
      });
      if (!newUser) {
        return { ok: false, error: "Can't create account." };
      }
      return { ok: true };
    },
  },
};

export default resolvers;
