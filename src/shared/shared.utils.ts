import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET || "",
  },
});

export const uploadToS3 = async (
  file: any,
  userId: number,
  folderName: string
): Promise<string> => {
  const { filename, createReadStream } = await file;
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "Instaclone-uploads-ms269",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};
