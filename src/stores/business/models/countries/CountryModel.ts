import { BaseModel } from "sjs-base-model";

export default class CountryModel extends BaseModel {
  public readonly id: number = -1;
  public readonly name: string = "";

  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<CountryModel>) {
    super();

    this.update(data);
  }
}
