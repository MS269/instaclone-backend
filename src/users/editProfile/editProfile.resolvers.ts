import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import { Context, Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const PORT: string = process.env.PORT;

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
        }: any,
        { client, loggedInUser }: Context
      ) => {
        let hashedPassword: string = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        let avatarUrl: string = null;
        if (avatar) {
          const { filename, createReadStream }: any = await avatar;
          const newFilename: string = `${
            loggedInUser.id
          }-${Date.now()}-${filename}`;
          const readStream: any = createReadStream();
          const writeStream: any = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:${PORT}/static/${newFilename}`;
        }
        const updatedUser: User = await client.user.update({
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
