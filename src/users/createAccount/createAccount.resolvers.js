import bcrypt from "bcrypt";

const resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password, firstName, lastName },
      { client }
    ) => {
      const existingUser = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
      });
      if (existingUser) {
        return { ok: false, error: "This username/email is already taken." };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
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
        return { ok: false, error: "New User not found." };
      }
      return { ok: true };
    },
  },
};

export default resolvers;