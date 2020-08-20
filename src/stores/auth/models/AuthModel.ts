import { BaseModel } from "sjs-base-model";
import UserModel from "./users/UserModel";

/*
    // Returned Api Data Sample
    {
      "token": "kkkkk.lllll..jjjjj"
      "expires": 0
      "user": {
        "email": "ncstech07@gmail.com",
        "first_name": "Ncs",
        "last_name": "Tech".
        "verified": false
      }
    }
 */
export default class AuthModel extends BaseModel {
  public readonly token: string = "";
  public readonly expires: number = 0;
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
