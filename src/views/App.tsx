import React, { Suspense, lazy } from "react";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { Persistor } from "redux-persist/es/types";
import IAction from "../models/IAction";
import RouteEnum from "../constants/RouteEnum";
import MainNav from "./components/main-nav/MainNav";
import LoadingIndicator from "./components/loading-indicator/LoadingIndicator";
import Toasts from "./components/toasts/Toasts";
import Dashboard from "./dashboard/Dashboard";

const LandingPage = lazy(() => import("./landing-page/LandingPage"));
const HomePage = lazy(() => import("./home-page/HomePage"));
const NotFoundPage = lazy(() => import("./not-found-page/NotFoundPage"));
const EpisodesPage = lazy(() => import("./episodes-page/EpisodesPage"));
const AboutPage = lazy(() => import("./about-page/AboutPage"));
const RequireAuthentication = lazy(() =>
  import("./components/require-authentication/RequireAuthentication")
);
const ProtectedRoute = lazy(() =>
  import("./components/protected-route/ProtectedRoute")
);
const UnauthenticatedRoute = lazy(() =>
  import("./components/unauthenticated-route/UnauthenticatedRoute")
);

interface IProps {
  readonly history: History;
  readonly persistor: Persistor;
  readonly dispatch: Dispatch<IAction<any>>;
}
interface IState {}

export default class App extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <ConnectedRouter history={this.props.history}>
        <Suspense fallback={<LoadingIndicator isActive={true} />}>
          <MainNav persistor={this.props.persistor}>
            <Switch>
              <UnauthenticatedRoute
                exact
                path={RouteEnum.LandingPage}
                authenticationPath={RouteEnum.Admin}
                component={LandingPage}
              />
              <UnauthenticatedRoute
                exact
                path={RouteEnum.Callback}
                authenticationPath={RouteEnum.Admin}
                component={RequireAuthentication}
              />
              <UnauthenticatedRoute
                exact
                path={RouteEnum.About}
                authenticationPath={RouteEnum.Admin}
                component={AboutPage}
              />
              <ProtectedRoute
                exact={true}
                authenticationPath={RouteEnum.LandingPage}
                path={RouteEnum.Admin}
                component={HomePage}
              />
              <ProtectedRoute
                exact={true}
                authenticationPath={RouteEnum.Admin}
                path={RouteEnum.Dashboard}
                component={Dashboard}
              />
              <Route component={NotFoundPage} />
            </Switch>
            <Toasts />
          </MainNav>
        </Suspense>
      </ConnectedRouter>
    );
  }
}
