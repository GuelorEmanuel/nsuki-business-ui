import React from "react";
import { Dropdown, Form, Header, Label } from "semantic-ui-react";
import { IFormFieldData } from "../../Interface";

interface IProps {
  readonly dataOnChange: (arg: IFormFieldData) => void;
  readonly businessName: string;
  readonly streetAddress: string;
  readonly apartmentSuite: string;
  readonly country: string;
  readonly provinceStates: string;
  readonly ZIPcodePostalCode: string;
  readonly requiredFields: Array<string>;
  readonly phone_number: string;
  readonly errorFlag: boolean;
  readonly errorFields: Array<string>;
}

interface IState {
  phone_number: string;
  error: boolean;
  update: boolean;
}

const countryOptions = [
  { key: "ca", value: "ca", flag: "ca", text: "Canada" },
  { key: "fr", value: "fr", flag: "fr", text: "France" },
  { key: "pt", value: "pt", flag: "pt", text: "Portugal" },
  { key: "us", value: "us", flag: "us", text: "United States" },
  { key: "nl", value: "nl", flag: "nl", text: "Netherlands" }
];

const getValueBasedOnProp = function(prop: any): string {
  if (prop === undefined || prop === null) return "";
  return prop;
};

class AddBusiness extends React.Component<IProps, IState> {
  private dataOnChange: (arg: IFormFieldData) => void;

  constructor(props: IProps) {
    super(props);
    this.dataOnChange = props.dataOnChange;
    this.state = {
      phone_number: props.phone_number,
      error: props.errorFlag,
      update: false
    };
  }

  componentDidUpdate(nextProps: IProps) {
    const { errorFlag } = this.props;

    if (nextProps.errorFlag !== errorFlag) {
      if (errorFlag) {
        this.setState((state, props) => ({ error: errorFlag }));
      }
    }
  }

  /*
        Restrict numeric fields to numbers only
    */
  onHandleChangeNumeric(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    let name = e.target.name;

    if (!Number(value) && value.length > 0) {
      return;
    }
    this.dataOnChange({ fieldName: name, value: value });
    this.setState({ [name]: value, error: this.props.errorFlag } as Pick<
      IState,
      keyof IState
    >);
  }

  public render(): JSX.Element {
    const {
      businessName,
      streetAddress,
      apartmentSuite,
      country,
      provinceStates,
      ZIPcodePostalCode,
      dataOnChange,
      requiredFields,
      errorFields
    } = this.props;

    return (
      <>
        <Form>
          <div className="ui grid">
            <div className="row left aligned">
              <div className="fifteen wide column">
                <Header as="h3" textAlign="left">
                  Add your business information
                </Header>
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <input
                  placeholder={
                    requiredFields.indexOf("businessName") > -1
                      ? "Business name *"
                      : "Business name"
                  }
                  name="businessName"
                  onChange={e => {
                    this.dataOnChange({
                      fieldName: "businessName",
                      value: e.target.value
                    });
                    this.setState((state, props) => ({ update: true }));
                  }}
                  defaultValue={getValueBasedOnProp(businessName)}
                />

                {this.state.error && errorFields.indexOf("businessName") > -1 && (
                  <Label basic color="red">
                    Please provide an business name
                  </Label>
                )}
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <input
                  placeholder={
                    requiredFields.indexOf("streetAddress") > -1
                      ? "Street address *"
                      : "Street Address"
                  }
                  name="streetAddress"
                  onChange={e => {
                    this.dataOnChange({
                      fieldName: "streetAddress",
                      value: e.target.value
                    });
                    this.setState((state, props) => ({ update: true }));
                  }}
                  defaultValue={getValueBasedOnProp(streetAddress)}
                />

                {this.state.error && errorFields.indexOf("streetAddress") > -1 && (
                  <Label basic color="red">
                    Please provide your business address
                  </Label>
                )}
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <input
                  placeholder={
                    requiredFields.indexOf("apartmentSuite") > -1
                      ? "Apartment, suite, unit, building, floor, et *"
                      : "Apartment, suite, unit, building, floor, etc"
                  }
                  name="apartmentSuite"
                  onChange={e => {
                    this.dataOnChange({
                      fieldName: "apartmentSuite",
                      value: e.target.value
                    });
                    this.setState((state, props) => ({ update: true }));
                  }}
                  defaultValue={getValueBasedOnProp(apartmentSuite)}
                />

                {this.state.error &&
                  errorFields.indexOf("apartmentSuite") > -1 && (
                    <Label basic color="red">
                      Please provide your business apartment building
                      information
                    </Label>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="ten wide column">
                <Form.Group inline>
                  <Form.Field>
                    <Dropdown
                      placeholder="Country"
                      search
                      closeOnBlur
                      selection
                      options={countryOptions}
                      defaultValue={country !== "" ? country : ""}
                      onChange={(event, result) => {
                        dataOnChange({
                          fieldName: "country",
                          value:
                            result.value === null || result.value === undefined
                              ? ""
                              : (result.value as string)
                        });
                        this.setState((state, props) => ({ error: false }));
                      }}
                    />
                    {this.state.error && errorFields.indexOf("country") > -1 && (
                      <Label basic color="red" pointing>
                        Please select a country
                      </Label>
                    )}
                  </Form.Field>
                  <Form.Field>
                    <input
                      placeholder={
                        requiredFields.indexOf("provinceStates") > -1
                          ? "Province/State *"
                          : "Province/State"
                      }
                      onChange={e => {
                        this.dataOnChange({
                          fieldName: "provinceStates",
                          value: e.target.value
                        });
                        this.setState((state, props) => ({ update: true }));
                      }}
                      defaultValue={getValueBasedOnProp(provinceStates)}
                    />
                    {this.state.error &&
                      errorFields.indexOf("provinceStates") > -1 && (
                        <Label basic color="red">
                          Please provide your province
                        </Label>
                      )}
                  </Form.Field>
                  <Form.Field>
                    <input
                      placeholder={
                        requiredFields.indexOf("ZIPcodePostalCode") > -1
                          ? "ZIP Code Postal code *"
                          : "ZIP Code/Postal code"
                      }
                      onChange={e => {
                        this.dataOnChange({
                          fieldName: "ZIPcodePostalCode",
                          value: e.target.value
                        });
                        this.setState((state, props) => ({ update: true }));
                      }}
                      defaultValue={getValueBasedOnProp(ZIPcodePostalCode)}
                    />
                    {this.state.error &&
                      errorFields.indexOf("ZIPcodePostalCode") > -1 && (
                        <Label basic color="red">
                          Please provide your zip code or postal code
                        </Label>
                      )}
                  </Form.Field>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="eight wide column">
                <input
                  placeholder={
                    requiredFields.indexOf("phone_number") > -1
                      ? "Phone number*"
                      : "Phone number"
                  }
                  name="phone_number"
                  onChange={e => {
                    this.onHandleChangeNumeric(e);
                    this.setState((state, props) => ({ update: true }));
                  }}
                  value={this.state.phone_number}
                />

                {this.state.error && errorFields.indexOf("phone_number") > -1 && (
                  <Label basic color="red">
                    Please provide a phone number
                  </Label>
                )}
              </div>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default AddBusiness;
