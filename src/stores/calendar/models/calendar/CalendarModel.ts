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
  public readonly type: string | null = "";
  public readonly method: string | null = "";
}

class NotificationSettings {
  public readonly notifications: Notification[] = [];
}

class DefaultReminder {
  public readonly method: string | null = "";
  public readonly minutes: number | null = 0;
}

class ConferenceProperties {
  public readonly allowedConferenceSolutionTypes: string[] = [];
}

export default class CalendarModel extends BaseModel {
  public readonly kind: string | null = "";
  public readonly etag: string | null = "";
  public readonly id: string | null = "";
  public readonly summary: string | null = "";
  public readonly description: string | null = "";

  public readonly location: string | null = "";
  public readonly timeZone: string | null = "";
  public readonly summaryOverride: string | null = "";
  public readonly colorId: string | null = "";
  public readonly backgroundColor: string | null = "";
  public readonly foregroundColor: string | null = "";
  public readonly hidden: boolean | null = false;
  public readonly selected: boolean | null = false;
  public readonly accessRole: string | null = "";

  public readonly defaultReminders: DefaultReminder[] = [];

  public readonly notificationSettings: NotificationSettings | null = new NotificationSettings();

  public readonly primary: boolean | null = false;
  public readonly deleted: string | null = "";
  public readonly conferenceProperties: ConferenceProperties = new ConferenceProperties();

  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<CalendarModel>) {
    super();

    this.update(data);
  }
}
