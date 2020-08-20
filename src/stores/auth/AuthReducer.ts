import BaseReducer from "../../utilities/BaseReducer";
import IAuthState from "./models/IAuthState";
import AuthAction from "./AuthAction";
import IAction from "../../models/IAction";
import AuthModel from "./models/AuthModel";

export default class AuthReducer extends BaseReducer<IAuthState> {
  public readonly initialState: IAuthState = {
    token: "",
    expires: 0,
    user: undefined
  };

  public [AuthAction.REQUEST_AUTH_FINISHED](
    state: IAuthState,
    action: IAction<AuthModel>
  ): IAuthState {
    return {
      ...state,
      token: action.payload?.token ? action.payload?.token : "",
      expires: action.payload?.expires ? action.payload?.expires : 0,
      user: action.payload?.user ? action.payload.user : undefined
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
}
