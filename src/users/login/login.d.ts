export interface LoginResponse {
  ok: boolean;
  token?: string;
  error?: string;
}

export interface LoginArgs {
  username: string | any;
  password: string | Buffer;
}
