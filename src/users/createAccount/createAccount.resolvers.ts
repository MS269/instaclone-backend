import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password, firstName, lastName },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
