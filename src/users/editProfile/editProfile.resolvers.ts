import bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { EditProfileArgs, EditProfileResult } from "./editProfile";

const PORT: string | number = process.env.PORT || 4000;

const resolvers: Resolvers = {
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
        }: EditProfileArgs,
        { client, loggedInUser }: Context
      ): Promise<EditProfileResult> => {
        let hashedPassword: string = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        let avatarUrl: string = null;
        if (avatar) {
          const { filename, createReadStream } = avatar;
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

export default resolvers;
