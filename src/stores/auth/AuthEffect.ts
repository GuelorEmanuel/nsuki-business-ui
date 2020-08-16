import environment from 'environment';
import { AxiosResponse } from 'axios';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import UserModel from './models/users/UserModel';
import EffectUtility from '../../utilities/EffectUtility';

export default class AuthEffect {
  public static async requestAuth(token: string): Promise<UserModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.auth_get_credential.replace(':token', token);

    return EffectUtility.getToModel<UserModel>(UserModel, endpoint);
  }

}
