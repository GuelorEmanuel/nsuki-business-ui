import { BaseModel } from "sjs-base-model";
import UserModel from "./users/UserModel";

/*
    // Returned Api Data Sample
    {
      "nbs_refresh_token": "kkkkk.lllll..jjjjj",
      "nbs_refresh_exp": 0,
      "nbs_access_token": "kkkki.luhhhhh.jjj",
      "nbs_access_exp": 0,
      "user": {
        "id": 0,
        "email": "ncstech07@gmail.com",
        "first_name": "Ncs",
        "last_name": "Tech".
        "verified": false
      }
    }
 */
export default class AuthModel extends BaseModel {
  public readonly nbs_refresh_token: string = "";
  public readonly nbs_refresh_exp: number = 0;
  public readonly nbs_access_token: string = "";
  public readonly nbs_access_exp: number = 0;
  public readonly user?: UserModel = undefined;

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<AuthModel>) {
    super();

    this.update(data);
  }
}
