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
import CalendarModel from "./calendar/CalendarModel";

class DefaultCalendarListModel {
  public readonly kind: string | null = "";
  public readonly etag: string | null = "";
  public readonly nextPageToken: string | null = "";
  public readonly nextSyncToken: string | null = "";
  public readonly items: CalendarModel[] = [];
}

export default class CalendarListModel extends BaseModel {
  public readonly data: DefaultCalendarListModel = {
    kind: "",
    etag: "",
    nextPageToken: "",
    nextSyncToken: "",
    items: []
  };

  /*
   * Client-Side properties (Not from API)
   */
  constructor(data: Partial<CalendarListModel>) {
    super();
    this.update(data);
  }
}
