import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import AuthModel from "./models/AuthModel";
import EffectUtility from "../../utilities/EffectUtility";

export default class AuthEffect {
  public static async requestAuth(
    token: string
  ): Promise<AuthModel | HttpErrorResponseModel> {
    const endpoint: string = environment.api.auth_get_credential.replace(
      ":token",
      token
    );

    return EffectUtility.getToModel<AuthModel>(AuthModel, endpoint);
  }
}
