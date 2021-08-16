import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, password: newPassword, firstName, lastName },
        { client, loggedInUser }
      ) => {
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            ...(hashedPassword && { password: hashedPassword }),
            firstName,
            lastName,
          },
        });
        if (updatedUser) {
          return { ok: true };
        } else {
          return { ok: false, error: "Could not update profile." };
        }
      }
    ),
  },
};

export default resolvers;
