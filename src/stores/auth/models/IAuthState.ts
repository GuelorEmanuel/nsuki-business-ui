import UserModel from "./users/UserModel";

export default interface IAuthState {
  readonly nbs_refresh_token: string;
  readonly nbs_refresh_exp: number;
  readonly nbs_access_token: string;
  readonly nbs_access_exp: number;
  readonly user: UserModel;
}
