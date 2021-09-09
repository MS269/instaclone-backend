export interface CreateCommentArgs {
  photoId: number;
  payload: string;
}

export interface CreateCommentResult {
  ok: boolean;
  error?: string;
}
