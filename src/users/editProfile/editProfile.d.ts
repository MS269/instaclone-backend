export interface EditProfileArgs {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: any;
}

export interface EditProfileResult {
  ok: boolean;
  error?: string;
}
