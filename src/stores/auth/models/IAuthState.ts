import UserModel from "./users/UserModel";

export default interface IAuthState {
  readonly token: string;
  readonly expires: number;
  readonly user?: UserModel;
}
