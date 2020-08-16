import UserModel from './users/UserModel';

export default interface IAuthState {
  readonly user: UserModel | null;
}