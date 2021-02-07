import { BaseModel } from "sjs-base-model";

export default class AddressModel extends BaseModel {
  public readonly street_no: string = "";
  public readonly apt_no: string = "";
  public readonly province_state: string = "";
  public readonly postal_code: string = "";
  public readonly business_id: number = -1;
  public readonly country_id: number = -1;
  public readonly id: number = -1;

  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<AddressModel>) {
    super();

    this.update(data);
  }
}
