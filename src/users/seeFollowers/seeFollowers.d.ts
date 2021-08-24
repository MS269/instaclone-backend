import { User } from "@prisma/client";

export interface SeeFollowersArgs {
  username: string;
  page: number;
}

export interface SeeFollowersResult {
  ok: boolean;
  error?: string;
  followers?: User[];
  totalPages?: number;
}
