import BaseReducer from "../../utilities/BaseReducer";
import IAuthState from "./models/IAuthState";
import AuthAction from "./AuthAction";
import IAction from "../../models/IAction";
import AuthModel from "./models/AuthModel";
import UserModel from "./models/users/UserModel";

export default class AuthReducer extends BaseReducer<IAuthState> {
  public readonly initialState: IAuthState = {
    nbs_refresh_token: "",
    nbs_refresh_exp: 0,
    nbs_access_token: "",
    nbs_access_exp: 0,
    user: {
      id: -1,
      image: "",
      first_name: "",
      last_name: "",
      email: "",
      verified: false
    } as UserModel
  };

  public [AuthAction.REQUEST_AUTH_FINISHED](
    state: IAuthState,
    action: IAction<AuthModel>
  ): IAuthState {
    return {
      ...state,
      nbs_refresh_token: action.payload?.nbs_refresh_token
        ? action.payload?.nbs_refresh_token
        : "",
      nbs_refresh_exp: action.payload?.nbs_refresh_exp
        ? action.payload?.nbs_refresh_exp
        : 0,
      nbs_access_token: action.payload?.nbs_access_token
        ? action.payload?.nbs_access_token
        : "",
      nbs_access_exp: action.payload?.nbs_access_exp
        ? action.payload?.nbs_access_exp
        : 0,
      user: action.payload?.user ? action.payload.user : this.initialState.user
    };
  }

  public [AuthAction.RESET_AUTH_FINISHED](
    state: IAuthState,
    action: IAction<AuthModel>
  ): IAuthState {
    return {
      ...state,
      ...this.initialState
    };
  }

  public [AuthAction.SET_AUTH_VERIFIED](
    state: IAuthState,
    action: IAction<AuthModel>
  ): IAuthState {
    let newUserModelState = new UserModel({verified: true});
    return {
      ...state,
      user: newUserModelState
    };
  }
  
}
