import React, { Suspense, lazy} from 'react';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch} from 'react-router-dom';
import { Dispatch } from 'redux';
import IAction from '../models/IAction';
import RouteEnum from '../constants/RouteEnum';
import MainNav from './components/main-nav/MainNav';
import LoadingIndicator from './components/loading-indicator/LoadingIndicator';
import Toasts from './components/toasts/Toasts';

const LandingPage = lazy(() => import('./landing-page/LandingPage'));
const HomePage = lazy(() => import('./home-page/HomePage'));
const NotFoundPage = lazy(() => import('./not-found-page/NotFoundPage'));
const EpisodesPage = lazy(() => import('./episodes-page/EpisodesPage'));
const AboutPage = lazy(() => import('./about-page/AboutPage'));
const RequireAuthentication = lazy(() => import('./components/require-authentication/RequireAuthentication'));
const ProtectedRoute = lazy(() => import('./components/protected-route/ProtectedRoute'));


interface IProps {
  readonly history: History;
  readonly dispatch: Dispatch<IAction<any>>;
}
interface IState {}

export default class App extends React.Component<IProps, IState> {
  public render(): JSX.Element {
    return (
      <ConnectedRouter history={this.props.history}>
        <Suspense fallback={<LoadingIndicator isActive={true} />}>
          <MainNav>
            <Switch>
              <Route exact path={RouteEnum.LandingPage} component={LandingPage} />
              <Route exact path={RouteEnum.Callback} component={RequireAuthentication} />
              <Route exact path={RouteEnum.About} component={AboutPage} />
              <ProtectedRoute 
                exact={true}
                authenticationPath={RouteEnum.LandingPage}
                path={RouteEnum.Admin}
                component={HomePage}
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
