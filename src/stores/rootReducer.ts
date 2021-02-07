import { combineReducers, Reducer, ReducersMapObject } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import IStore from "../models/IStore";
import AuthReducer from "./auth/AuthReducer";
import ShowsReducer from "./shows/ShowsReducer";
import CalendarReducer from "./calendar/CalendarReducer";
import RequestingReducer from "./requesting/RequestingReducer";
import ErrorReducer from "./error/ErrorReducer";
import ToastsReducer from "./toasts/ToastsReducer";
import BusinessesReducer from "./business/BusinessesReducer";

export default (history: History): Reducer<IStore> => {
  const reducerMap: ReducersMapObject<IStore> = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    router: connectRouter(history) as any,
    auth: new AuthReducer().reducer,
    calendar: new CalendarReducer().reducer,
    business: new BusinessesReducer().reducer,
    shows: new ShowsReducer().reducer,
    toasts: new ToastsReducer().reducer
  };

  return combineReducers(reducerMap);
};
