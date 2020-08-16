import { BaseModel } from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "email": "ncstech07@gmail.com",
      "first_name": "Ncs",
      "last_name": "Tech",
      "token": "kkkkk.lllll..jjjjj"
    }
 */
export default class UserModel extends BaseModel {
  public readonly email: string = '';
  public readonly first_name: string = '';
  public readonly last_name: string = '';
  public readonly token: string = '';
  public readonly verified: boolean = false;

  /*
   * Client-Side properties (Not from API)
   */
  // public noneApiProperties: unknown = null;

  constructor(data: Partial<UserModel>) {
    super();

    this.update(data);
  }
}