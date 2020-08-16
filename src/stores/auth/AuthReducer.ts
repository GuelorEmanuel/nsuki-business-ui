import BaseReducer from '../../utilities/BaseReducer';
import IAuthState from './models/IAuthState';
import AuthAction from './AuthAction';
import IAction from '../../models/IAction';
import UserModel from './models/users/UserModel';

export default class AuthReducer extends BaseReducer<IAuthState> {
  public readonly initialState: IAuthState = {
    user: null
  };

  public [AuthAction.REQUEST_AUTH_FINISHED](state: IAuthState, action: IAction<UserModel>): IAuthState {
    return {
      ...state,
      user: action.payload!,
    };
  }
}
