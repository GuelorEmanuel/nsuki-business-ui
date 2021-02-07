import { RouterState } from "connected-react-router";
import IShowsState from "../stores/shows/models/IShowsState";
import ICalendarState from "../stores/calendar/models/ICalendarState";
import IRequestingState from "../stores/requesting/models/IRequestingState";
import IAuthState from "../stores/auth/models/IAuthState";
import IErrorState from "../stores/error/models/IErrorState";
import IToastsState from "../stores/toasts/models/IToastsState";
import IBusinessesState from "stores/business/models/IBusinessesState";

export default interface IStore {
  readonly error: IErrorState;
  readonly auth: IAuthState;
  readonly requesting: IRequestingState;
  readonly router: RouterState;
  readonly calendar: ICalendarState;
  readonly business: IBusinessesState;
  readonly shows: IShowsState;
  readonly toasts: IToastsState;
}
