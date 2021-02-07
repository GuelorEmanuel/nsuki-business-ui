import { BaseModel } from "sjs-base-model";

export default class ServiceModel extends BaseModel {
  public readonly id: number = -1;
  public readonly name: string = "";

  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<ServiceModel>) {
    super();

    this.update(data);
  }
}
