import BaseReducer from "../../utilities/BaseReducer";
import IBusinessesState from "./models/IBusinessesState";
import BusinessAction from "./BusinessesAction";
import IAction from "../../models/IAction";
import AddressModel from "./models/addresses/AddressModel";
import ServiceModel from "./models/services/ServiceModel";
import BusinessModel from "./models/businesses/BusinessModel";
import CalendarMetadataModel from "./models/calendar-metadata/CalendarMetadataModel";
import CountryModel from "./models/countries/CountryModel";
import CountryCodeModel from "./models/country-codes/CountryCodesModel";

export default class BusinessesReducer extends BaseReducer<IBusinessesState> {
  public readonly initialState: IBusinessesState = {
    addresses: AddressModel as any,
    services: ServiceModel as any,
    business: BusinessModel as any,
    calendar_metadata: CalendarMetadataModel as any,
    country: CountryModel as any,
    country_code: CountryCodeModel as any
  };

  public [BusinessAction.REQUEST_BUSINESS_FINISHED](
    state: IBusinessesState,
    action: IAction<BusinessModel>
  ): IBusinessesState {
    return {
      ...state,
      business: action.payload ? action.payload : this.initialState.business
    };
  }
}
