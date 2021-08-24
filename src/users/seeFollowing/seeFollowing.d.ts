import { User } from "@prisma/client";

export interface SeeFollowingArgs {
  username: string;
  lastId: number;
}

export interface SeeFollowingResult {
  ok: boolean;
  error?: string;
  following?: User[];
}
