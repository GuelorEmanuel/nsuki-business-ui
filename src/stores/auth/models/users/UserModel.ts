import { BaseModel } from "sjs-base-model";

/*
    // Returned Api Data Sample
    {
      "id": 0,
      "email": "ncstech07@gmail.com",
      "first_name": "Ncs",
      "last_name": "Tech",
      "verified": false,
      "images": "https://lh3.googleusercontent.com/a-/Asjsjjsjsjsjsj"
    }
 */
export default class UserModel extends BaseModel {
  public readonly id: number = -1;
  public readonly first_name: string = "";
  public readonly last_name: string = "";
  public readonly email: string = "";
  public readonly verified: boolean = false;
  public readonly image: string = "";

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<UserModel>) {
    super();

    this.update(data);
  }
}
