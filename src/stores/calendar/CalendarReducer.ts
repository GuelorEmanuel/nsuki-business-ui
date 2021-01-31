import BaseReducer from "../../utilities/BaseReducer";
import ICalendarState from "./models/ICalendarState";
import CalendarAction from "./CalendarAction";
import IAction from "../../models/IAction";
import CalendarListModel from "./models/CalendarListModel";

export default class CalendarReducer extends BaseReducer<ICalendarState> {
  public readonly initialState: ICalendarState = {
    calendar: ({
      data: {
        nextSyncToken: "",
        nextPageToken: "",
        etag: "",
        kind: "",
        items: []
      } 
    } as unknown) as CalendarListModel
  };

  public [CalendarAction.REQUEST_CALENDAR_FINISHED](
    state: ICalendarState,
    action: IAction<CalendarListModel>
  ): ICalendarState {
    return {
      ...state,
      calendar: action.payload ? action.payload : <CalendarListModel>(<unknown>{
            data: {
              nextSyncToken: "",
              nextPageToken: "",
              etag: "",
              kind: "",
              items: []
            }
          })
    };
  }
}
