import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import IStore from "../../../models/IStore";
import IAuthState from "../../../stores/auth/models/IAuthState";

interface IStateToProps {
  readonly auth: IAuthState;
}
interface UnauthenticatedRouteProps extends RouteProps {
  authenticationPath: string;
}

const mapStateToProps = (
  state: IStore,
  ownProps: UnauthenticatedRouteProps
): IStateToProps => ({
  auth: state.auth
});

class UnauthenticatedRoute extends Route<
  UnauthenticatedRouteProps & IStateToProps
> {
  public render() {
    let redirectPath: string = "";
    if (this.props.auth.nbs_refresh_token) {
      redirectPath = this.props.authenticationPath;
    }

    if (redirectPath) {
      const renderComponent = () => (
        <Redirect to={{ pathname: redirectPath }} />
      );
      return (
        <Route {...this.props} component={renderComponent} render={undefined} />
      );
    } else {
      return <Route {...this.props} />;
    }
  }
}

export { UnauthenticatedRoute as Unconnected };
export default connect(mapStateToProps)(UnauthenticatedRoute);
