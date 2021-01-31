import { BaseModel } from "sjs-base-model";

export default class CalendarMetadataModel extends BaseModel {
  public readonly summary: string = "";
  public readonly time_zone: string = "";
  public readonly id: number = -1;

  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<CalendarMetadataModel>) {
    super();

    this.update(data);
  }
}
