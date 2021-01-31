import React from "react";
import { connect } from "react-redux";
import { Button, Header, Container, Form, Icon } from "semantic-ui-react";
import IStore from "../../../../models/IStore";
import { ReduxProps } from "../../../../models/ReduxProps";

import { selectRequesting } from "../../../../selectors/requesting/RequestingSelector";
import CalendarAction from "../../../../stores/calendar/CalendarAction";
import CalendarImport from "./components/calendar-import/CalendarImport";
import AddService from "./components/add-service/AddService";
import Deposit from "./components/deposit/Deposit";
import { IFormFieldData } from "./Interface";
import ICalendarState from "../../../../stores/calendar/models/ICalendarState";
import IAuthState from "../../../../stores/auth/models/IAuthState";
import BusinessesAction from "../../../../stores/business/BusinessesAction";
import AddBusiness from "./components/add-business/AddBusiness";
import IToastsState from "../../../../stores/toasts/models/IToastsState";
import { stat } from "fs";

interface IProps {}
interface IState {
  activeForm: number;
  error: boolean;
  formState: any;
}
interface IRouteParams {}
interface IStateToProps {
  readonly isRequesting: boolean;
  readonly calendar: ICalendarState;
  readonly auth: IAuthState;
  readonly toasts: IToastsState;
}

let errorFieldsSet = new Set<string>();

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  isRequesting: selectRequesting(state, [CalendarAction.REQUEST_CALENDAR]),
  calendar: state.calendar,
  auth: state.auth,
  toasts: state.toasts
});

class BareMinimumInformation extends React.Component<
  IProps & IStateToProps & ReduxProps<any, IRouteParams>,
  IState
> {
  private requiredFieldsForCalendarForm = ["calendar"];
  private requiredFieldsForAddServiceForm = [
    "appointmentName",
    "durationInMinute",
    "price",
    "serviceLocation"
  ];
  private requiredFieldsForAddBusinessForm = [
    "businessName",
    "streetAddress",
    "country",
    "provinceStates",
    "ZIPcodePostalCode",
    "phone_number"
  ];
  private requiredFieldsForDepositForm = ["amount"];
  private addServiceDataMap = {};

  constructor(props: IProps & IStateToProps & ReduxProps<any, IRouteParams>) {
    super(props);

    this.state = {
      activeForm: 1,
      error: false,
      formState: new Map()
    };
  }

  public componentDidMount(): void {
    this.state = {
      activeForm: 1,
      error: false,
      formState: new Map()
    };
    this.props.dispatch(CalendarAction.requestCalendar());
  }

  validateFormFields = (formFields: Array<string>): boolean => {
    for (let field of formFields) {
      if (
        !this.addServiceDataMap[field] ||
        this.addServiceDataMap[field] === ""
      ) {
        errorFieldsSet.add(field);
      }
    }
    if (errorFieldsSet.size > 0) return false;

    return true;
  };

  onDataChangeHandler = (data: IFormFieldData): void => {
    this.addServiceDataMap[data.fieldName] = data.value;
    this.setState({ ...this.state, formState: this.addServiceDataMap });
    errorFieldsSet.delete(data.fieldName);
  };

  submitForms = async (): Promise<void> => {
    let tempFormdata = new FormData();
    tempFormdata.append("data", JSON.stringify(this.state.formState));
    await this.props.dispatch(
      BusinessesAction.submitOnboardingForm(tempFormdata)
    );
    if (this.props.toasts.items.length > 0) {
      this.setState((state, props) => ({
        activeForm: state.activeForm - 1,
        error: true
      }));
    }
  };

  public render(): JSX.Element {
    return (
      <>
        {
          <Container>
            {this.state.activeForm === 1 ? (
              <div className="ui grid">
                <div className="row">
                  <div className="centered sixteen wide column">
                    <CalendarImport
                      calendarList={this.props.calendar.calendar.data.items}
                      loggedInEmail={this.props.auth.user.email}
                      selectedCalendar={
                        this.addServiceDataMap["calendar"]
                          ? this.addServiceDataMap["calendar"]
                          : ""
                      }
                      dataOnChange={this.onDataChangeHandler}
                      requiredFields={this.props.calendar.calendar.data.items}
                      errorFlag={this.state.error}
                      errorFields={Array.from(errorFieldsSet.values())}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="centered seven wide column">
                    <Button
                      className="fluid ui formlink"
                      onClick={() => {
                        if (
                          this.validateFormFields(
                            this.requiredFieldsForCalendarForm
                          )
                        ) {
                          this.setState((state, props) => ({
                            activeForm: state.activeForm + 1,
                            error: false
                          }));
                        } else {
                          this.setState((state, props) => ({ error: true }));
                        }
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.activeForm === 2 ? (
              <div className="ui grid formcontainer">
                <div className="row white">
                  <div className="sixteen wide left aligned column">
                    <div className="ui link items">
                      <div
                        className="item"
                        onClick={() => {
                          if (!this.state.error) {
                            this.setState((state, props) => ({
                              activeForm: state.activeForm - 1
                            }));
                          }
                        }}
                      >
                        <Header as="h3" textAlign="left">
                          <Icon name="arrow alternate circle left" />
                          Choose Calendar
                        </Header>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="centered sixteen wide column">
                    <AddBusiness
                      dataOnChange={this.onDataChangeHandler}
                      businessName={
                        this.addServiceDataMap["businessName"]
                          ? this.addServiceDataMap["businessName"]
                          : ""
                      }
                      streetAddress={
                        this.addServiceDataMap["streetAddress"]
                          ? this.addServiceDataMap["streetAddress"]
                          : ""
                      }
                      apartmentSuite={
                        this.addServiceDataMap["apartmentSuite"]
                          ? this.addServiceDataMap["apartmentSuite"]
                          : ""
                      }
                      country={
                        this.addServiceDataMap["country"]
                          ? this.addServiceDataMap["country"]
                          : ""
                      }
                      provinceStates={
                        this.addServiceDataMap["provinceStates"]
                          ? this.addServiceDataMap["provinceStates"]
                          : ""
                      }
                      ZIPcodePostalCode={
                        this.addServiceDataMap["ZIPcodePostalCode"]
                          ? this.addServiceDataMap["ZIPcodePostalCode"]
                          : ""
                      }
                      phone_number={
                        this.addServiceDataMap["phone_number"]
                          ? this.addServiceDataMap["phone_number"]
                          : ""
                      }
                      requiredFields={this.requiredFieldsForAddBusinessForm}
                      errorFlag={this.state.error}
                      errorFields={Array.from(errorFieldsSet.values())}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="ten wide column"></div>
                  <div className="four wide column">
                    <Button
                      className="fluid ui formlink"
                      onClick={() => {
                        if (
                          this.validateFormFields(
                            this.requiredFieldsForAddBusinessForm
                          )
                        ) {
                          this.setState((state, props) => ({
                            activeForm: state.activeForm + 1,
                            error: false
                          }));
                        } else {
                          this.setState((state, props) => ({ error: true }));
                        }
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.activeForm === 3 ? (
              <div className="ui grid formcontainer">
                <div className="row white">
                  <div className="sixteen wide left aligned column">
                    <div className="ui link items">
                      <div
                        className="item"
                        onClick={() => {
                          if (!this.state.error) {
                            this.setState((state, props) => ({
                              activeForm: state.activeForm - 1
                            }));
                          }
                        }}
                      >
                        <Header as="h3" textAlign="left">
                          <Icon name="arrow alternate circle left" />
                          Choose Calendar
                        </Header>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="centered sixteen wide column">
                    <AddService
                      dataOnChange={this.onDataChangeHandler}
                      appointmentName={
                        this.addServiceDataMap["appointmentName"]
                          ? this.addServiceDataMap["appointmentName"]
                          : ""
                      }
                      durationInMinute={
                        this.addServiceDataMap["durationInMinute"]
                          ? this.addServiceDataMap["durationInMinute"]
                          : ""
                      }
                      price={
                        this.addServiceDataMap["price"]
                          ? this.addServiceDataMap["price"]
                          : ""
                      }
                      description={
                        this.addServiceDataMap["description"]
                          ? this.addServiceDataMap["description"]
                          : ""
                      }
                      selectedServiceLocation={
                        this.addServiceDataMap["serviceLocation"]
                          ? this.addServiceDataMap["serviceLocation"].split(",")
                          : []
                      }
                      requiredFields={this.requiredFieldsForAddServiceForm}
                      errorFlag={this.state.error}
                      errorFields={Array.from(errorFieldsSet.values())}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="ten wide column"></div>
                  <div className="four wide column">
                    <Button
                      className="fluid ui formlink"
                      onClick={() => {
                        if (
                          this.validateFormFields(
                            this.requiredFieldsForAddServiceForm
                          )
                        ) {
                          this.setState((state, props) => ({
                            activeForm: state.activeForm + 1,
                            error: false
                          }));
                        } else {
                          this.setState((state, props) => ({ error: true }));
                        }
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.activeForm === 4 ? (
              <div className="ui grid formcontainer">
                <div className="row white">
                  <div className="sixteen wide left aligned column">
                    <div className="ui link items">
                      <div
                        className="item"
                        onClick={() => {
                          if (!this.state.error) {
                            this.setState((state, props) => ({
                              activeForm: state.activeForm - 1
                            }));
                          }
                        }}
                      >
                        <Header as="h3" textAlign="left">
                          <Icon name="arrow alternate circle left" />
                          Add Service
                        </Header>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="centered sixteen wide column">
                    <Deposit
                      dataOnChange={this.onDataChangeHandler}
                      requiredFields={this.requiredFieldsForDepositForm}
                      depositType={
                        this.addServiceDataMap["depositType"]
                          ? this.addServiceDataMap["depositType"]
                          : ""
                      }
                      amount={
                        this.addServiceDataMap["amount"]
                          ? this.addServiceDataMap["amount"]
                          : ""
                      }
                      errorFlag={this.state.error}
                      errorFields={Array.from(errorFieldsSet.values())}
                    />
                  </div>
                </div>
                <div className="row"></div>
                <div className="row">
                  <Form
                    onSubmit={() => {
                      console.log(
                        "addServiceDataMap: ",
                        this.addServiceDataMap
                      );
                      if (
                        this.addServiceDataMap["depositType"] === "None" ||
                        (this.validateFormFields(
                          this.requiredFieldsForDepositForm
                        ) &&
                          this.props.toasts.items.length <= 0)
                      ) {
                        this.setState((state, props) => ({
                          activeForm: state.activeForm + 1,
                          error: false
                        }));
                        this.submitForms();
                      } else {
                        this.setState((state, props) => ({ error: true }));
                      }
                    }}
                  >
                    <div className="four wide centered middle aligned column">
                      <Button type="submit" className="fluid ui formlink">
                        Done
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            ) : null}
          </Container>
        }
      </>
    );
  }
}

export { BareMinimumInformation as Unconnected };
export default connect(mapStateToProps)(BareMinimumInformation);
