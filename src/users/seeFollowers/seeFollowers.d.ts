import { User } from "@prisma/client";

export interface SeeFollowersArgs {
  username: string;
  page: number;
}

export interface SeeFollowersResponse {
  ok: boolean;
  error?: string;
  followers?: User[];
  totalPages?: number;
}
