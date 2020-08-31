/*

{
  "kind": "calendar#calendarList",
  "etag": etag,
  "nextPageToken": string,
  "nextSyncToken": string,
  "items": [
    calendarList Resource
  ]
}

*/

// This structure represents repsonse body being returned by GOOGLE get calendar API
import { BaseModel } from "sjs-base-model";
import CalendarModel from "./CalendarModel"

export default class CalendarListModel extends BaseModel {
  public readonly kind: string = "";
  public readonly etag: string = "";
  public readonly nextPageToken: string = "";
  public readonly nexySyncToken: string = "";
  public readonly items: CalendarModel[] = [];

  /*
   * Client-Side properties (Not from API)
   */
  constructor(data: Partial<CalendarListModel>) {
    super();

    this.update(data);
  }
}
