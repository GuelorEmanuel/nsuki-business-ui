import CalendarEffect from "./CalendarEffect";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import IStore from "../../models/IStore";
import CalendarListModel from "./models/CalendarListModel";

type ActionUnion = undefined | HttpErrorResponseModel | CalendarListModel;

export default class ShowsAction {
  public static readonly REQUEST_CALENDAR: string =
    "CalendarAction.REQUEST_CALENDAR";
  public static readonly REQUEST_CALENDAR_FINISHED: string =
    "CalendarAction.REQUEST_CALENDAR_FINISHED";

  public static readonly REQUEST_ERROR: string = "ShowsAction.REQUEST_ERROR";
  public static readonly REQUEST_ERROR_FINISHED: string =
    "ShowsAction.REQUEST_ERROR_FINISHED";

  public static requestCalendar(): any {
    return async (
      dispatch: ReduxDispatch<ActionUnion>,
      getState: () => IStore
    ): Promise<void> => {
      const token: string = getState().auth.nbs_access_token;

      await ActionUtility.createThunkEffect<CalendarListModel>(
        dispatch,
        ShowsAction.REQUEST_CALENDAR,
        CalendarEffect.requestCalendar,
        token
      );
    };
  }

  public static requestError(): any {
    return async (
      dispatch: ReduxDispatch<ActionUnion>,
      getState: () => IStore
    ): Promise<void> => {
      await ActionUtility.createThunkEffect<any>(
        dispatch,
        ShowsAction.REQUEST_ERROR,
        CalendarEffect.requestError
      );
    };
  }
}
