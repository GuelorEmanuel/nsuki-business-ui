/*
{
  "kind": "calendar#calendarListEntry",
  "etag": etag,
  "id": string,
  "summary": string,
  "description": string,
  "location": string,
  "timeZone": string,
  "summaryOverride": string,
  "colorId": string,
  "backgroundColor": string,
  "foregroundColor": string,
  "hidden": boolean,
  "selected": boolean,
  "accessRole": string,
  "defaultReminders": [
    {
      "method": string,
      "minutes": integer
    }
  ],
  "notificationSettings": {
    "notifications": [
      {
        "type": string,
        "method": string
      }
    ]
  },
  "primary": boolean,
  "deleted": boolean,
  "conferenceProperties": {
    "allowedConferenceSolutionTypes": [
      string
    ]
  }

*/

// This structure represent CalendarModel entity within CalendarListModel 

import { BaseModel } from "sjs-base-model";

class Notification {
    public readonly type: string = "";
    public readonly method: string = "";
}

class NotificationSettings {
  public readonly notifications: Notification[] = [];
}

class DefaultReminder {
  public readonly method: string = "";
  public readonly minutes: number = 0;
}

class ConferenceProperties {
    public readonly allowedConferenceSolutionTypes: string[] = [];
}

export default class CalendarModel extends BaseModel {
  public readonly kind: string = "";
  public readonly etag: string = "";
  public readonly id: string = "";
  public readonly summary: string = "";
  public readonly description: string = "";

  public readonly location: string = "";
  public readonly timeZone: string = "";
  public readonly summaryOverride: string = "";
  public readonly colorId: string = "";
  public readonly backgroundColor: string = "";
  public readonly foregroundColor: string = "";
  public readonly hidden: boolean = false;
  public readonly selected: boolean = false;
  public readonly accessRole: string = "";

  public readonly defaultReminders: DefaultReminder[] = [];

  public readonly notificationSettings: NotificationSettings = new NotificationSettings();

  public readonly primary: boolean = false;
  public readonly deleted: string = "";
  public readonly conferenceProperties: ConferenceProperties = new ConferenceProperties();

  /*
   * Client-Side properties (Not from API)
   */
  
  constructor(data: Partial<CalendarModel>) {
    super();

    this.update(data);
  }
}
