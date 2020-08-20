import AuthEffect from "./AuthEffect";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import AuthModel from "./models/AuthModel";

type ActionUnion = undefined | HttpErrorResponseModel | AuthModel;

export default class AuthAction {
  public static readonly REQUEST_AUTH: string = "AuthAction.REQUEST_AUTH";
  public static readonly REQUEST_AUTH_FINISHED: string =
    "AuthAction.REQUEST_AUTH_FINISHED";

  public static readonly REQUEST_ERROR: string = "AuthAction.REQUEST_ERROR";
  public static readonly REQUEST_ERROR_FINISHED: string =
    "AuthAction.REQUEST_ERROR_FINISHED";

  public static readonly RESET_AUTH_FINISHED: string =
    "AuthAction.RESET_AUTH_FINISHED";

  public static requestAuth(): any {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let uri_access_token = params.get("access_token");

      await ActionUtility.createThunkEffect<AuthModel>(
        dispatch,
        AuthAction.REQUEST_AUTH,
        AuthEffect.requestAuth,
        uri_access_token
      );
    };
  }

  public static resetAuth(): any {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      dispatch(
        ActionUtility.createAction<undefined>(AuthAction.RESET_AUTH_FINISHED)
      );
    };
  }
}
