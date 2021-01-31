import { connect } from "react-redux";
import IStore from "../../models/IStore";
import ShowsAction from "../../stores/shows/ShowsAction";
import CalendarAction from "../../stores/calendar/CalendarAction";
import { ReduxProps } from "../../models/ReduxProps";
import { selectRequesting } from "../../selectors/requesting/RequestingSelector";
import { Container } from "semantic-ui-react";
import React from "react";
import BareMinimumInformation from "./components/bare-min-information/BareMinimumInformation";
import ICalendarState from "../../stores/calendar/models/ICalendarState";
import IAuthState from "../../stores/auth/models/IAuthState";
import IBusinessesState from "stores/business/models/IBusinessesState";

interface IProps {
  auth: IAuthState;
  business: IBusinessesState;
}
interface IState {}
interface IRouteParams {}
interface IStateToProps {
  readonly isRequesting: boolean;
  readonly auth: IAuthState;
  readonly business: IBusinessesState;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  isRequesting: selectRequesting(state, [
    ShowsAction.REQUEST_SHOW,
    ShowsAction.REQUEST_CAST,
    CalendarAction.REQUEST_CALENDAR
  ]),
  auth: state.auth,
  business: state.business
});

class HomePage extends React.Component<
  IProps & IStateToProps & ReduxProps<any, IRouteParams>,
  IState
> {
  public componentDidMount(): void {
    const { auth } = this.props;
    const verified = auth ? auth.user.verified : false;
    if (!verified) {
      this.props.dispatch(CalendarAction.requestCalendar());
    }
  }
  public render(): JSX.Element {
    // const { isRequesting } = this.props;
    const { auth, business } = this.props;
    const verified = auth ? auth.user.verified : false;
    const business_exist = Object.keys(business).length === 0 ? false : true;
    return (
      <div
        style={{
          paddingLeft: "300px",
          paddingRight: "20px",
          position: "relative",
          display: "inline block"
        }}
      >
        <Container style={{ margin: 150 }}>
          {!verified && !business_exist && (
            <BareMinimumInformation
              history={this.props.history}
              location={this.props.location}
              match={this.props.match}
            />
          )}

          {/*
          <LoadingIndicator isActive={isRequesting}>
            <MainOverview />
            <Divider horizontal={true}>
              <Header as="h4">
                <Icon name="users" /> Cast
              </Header>
            </Divider>
            <Actors />
          </LoadingIndicator>
        */}
        </Container>
      </div>
    );
  }
}

export { HomePage as Unconnected };
export default connect(mapStateToProps)(HomePage);
