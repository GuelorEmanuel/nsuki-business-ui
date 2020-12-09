import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import reduxFreeze from "redux-freeze";
import environment from "environment";
import rootReducer from "./rootReducer";
import IStore from "../models/IStore";
import errorToastMiddleware from "../middlewares/errorToastMiddleware";
import TransformCredentials from "../utilities/TransformCredentials";

export const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["extras"],
  transforms: [TransformCredentials]
};

export default (
  initialState: Partial<IStore>,
  history: History
): Store<IStore> => {
  const persistedReducer = persistReducer(persistConfig, rootReducer(history));
  const middleware: Middleware[] = [
    environment.isDevelopment ? reduxFreeze : null!,
    thunk,
    routerMiddleware(history),
    logger,
    errorToastMiddleware()
  ].filter(Boolean);

  const store: Store<IStore> = createStore(
    persistedReducer,
    initialState as any,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  // store.subscribe(() => console.log(store.getState()));

  return store;
};
