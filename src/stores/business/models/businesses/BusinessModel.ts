import { BaseModel } from "sjs-base-model";

export default class BusinessModel extends BaseModel {
  public readonly title: string = "";
  public readonly phone_number: string = "";
  public readonly id: number = -1;
  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<BusinessModel>) {
    super();
    this.update(data["data"]);
  }
}
