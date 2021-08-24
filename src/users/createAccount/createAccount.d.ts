export interface CreateAccountArgs {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

export interface CreateAccountResult {
  ok: boolean;
  error?: string;
}
