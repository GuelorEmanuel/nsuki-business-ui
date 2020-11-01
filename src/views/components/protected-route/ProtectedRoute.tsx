import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { connect } from "react-redux";
import IStore from "../../../models/IStore";
import IAuthState from "../../../stores/auth/models/IAuthState";

interface IStateToProps {
  readonly auth: IAuthState;
}
interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}

const mapStateToProps = (
  state: IStore,
  ownProps: ProtectedRouteProps
): IStateToProps => ({
  auth: state.auth
});

class ProtectedRoute extends Route<ProtectedRouteProps & IStateToProps> {
  public render() {
    let redirectPath: string = "";
    if (!this.props.auth.nbs_refresh_token) {
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

export { ProtectedRoute as Unconnected };
export default connect(mapStateToProps)(ProtectedRoute);
