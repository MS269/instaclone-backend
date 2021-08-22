import bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";
import { protectedResolver } from "../users.utils";

const PORT = process.env.PORT;

export default {
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
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:${PORT}/static/${newFilename}`;
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            firstName,
            lastName,
            bio,
            ...(hashedPassword && { password: hashedPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
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
