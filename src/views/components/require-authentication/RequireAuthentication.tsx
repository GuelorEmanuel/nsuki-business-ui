import React from "react";
import { connect } from "react-redux";
import IStore from "../../../models/IStore";
import AuthAction from "../../../stores/auth/AuthAction";
import { ReduxProps } from "../../../models/ReduxProps";
import IAuthState from "../../../stores/auth/models/IAuthState";
import RouteEnum from "../../../constants/RouteEnum";
import LoadingIndicator from "../../components/loading-indicator/LoadingIndicator";

interface IProps {
  readonly history: History;
}
interface IState {}
interface IRouteParams {}
interface IStateToProps {
  readonly auth: IAuthState;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  auth: state.auth
});

class RequireAuthentication extends React.Component<
  IProps & IStateToProps & ReduxProps<any, IRouteParams>,
  IState
> {
  async componentDidMount(): Promise<void> {
    await this.props.dispatch(AuthAction.requestAuth());

    if (this.props.auth.nbs_refresh_token) {
      this.props.history.push(RouteEnum.Admin);
    } else {
      this.props.history.push(RouteEnum.LandingPage);
    }
  }

  public render(): JSX.Element {
    const { auth } = this.props;
    const isLoading = auth.nbs_refresh_token === "";

    return <LoadingIndicator isActive={isLoading} />;
  }
}

export { RequireAuthentication as Unconnected };
export default connect(mapStateToProps)(RequireAuthentication);
