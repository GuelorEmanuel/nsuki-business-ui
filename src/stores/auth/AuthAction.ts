import AuthEffect from './AuthEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import UserModel from './models/users/UserModel';
import LocalS from '../../utilities/LocalS';

type ActionUnion = undefined | HttpErrorResponseModel | UserModel;

export default class AuthAction {
  public static readonly REQUEST_AUTH: string = 'AuthAction.REQUEST_AUTH';
  public static readonly REQUEST_AUTH_FINISHED: string = 'AuthAction.REQUEST_AUTH_FINISHED';

  public static readonly REQUEST_ERROR: string = 'AuthAction.REQUEST_ERROR';
  public static readonly REQUEST_ERROR_FINISHED: string = 'AuthAction.REQUEST_ERROR_FINISHED';

  public static requestAuth(): any {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let uri_access_token = params.get('access_token');
      
      // await LocalS.save('userjwt', uri_access_token);
      console.log(`uri_access_token: ${uri_access_token}`)

      await ActionUtility.createThunkEffect<UserModel>(dispatch, AuthAction.REQUEST_AUTH, AuthEffect.requestAuth, uri_access_token);
    };
  }
}
