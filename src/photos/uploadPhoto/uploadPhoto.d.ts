import { FileUpload } from "graphql-upload";

export interface UploadPhotoArgs {
  file: FileUpload;
  caption?: string;
}
