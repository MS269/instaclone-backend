import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import { protectedResolver } from "../users.utils";

const resolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          password: newPassword,
          firstName,
          lastName,
          bio,
          avatar,
        },
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
            bio,
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
