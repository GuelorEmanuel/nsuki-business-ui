import { BaseModel } from "sjs-base-model";

export default class CountryCodeModel extends BaseModel {
  public readonly code: number = 0;
  public readonly country_id: number = -1;
  public readonly id: number = -1;

  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<CountryCodeModel>) {
    super();

    this.update(data);
  }
}
