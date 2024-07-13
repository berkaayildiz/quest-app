/**
 * Represents the user that is currently logged in.
 */
export type AuthUser = {
  id: number;
  username: string;
  accessToken: string;
  refreshToken: string;
};
