import bcrypt from "bcrypt";
import { Context, Resolvers } from "../../types";
import { CreateAccountArgs, CreateAccountResult } from "./createAccount";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password, firstName, lastName }: CreateAccountArgs,
      { client }: Context
    ): Promise<CreateAccountResult> => {
      const existingUser = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
        select: { id: true },
      });
      if (existingUser) {
        return { ok: false, error: "This username/email is already taken." };
      }
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const newUser = await client.user.create({
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
