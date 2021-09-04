export interface EditPhotoArgs {
  id: number;
  caption: string;
}

export interface EditPhotoResult {
  ok: boolean;
  error?: string;
}
