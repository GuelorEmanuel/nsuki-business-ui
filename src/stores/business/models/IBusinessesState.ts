import CountryModel from "./countries/CountryModel";
import AddressModel from "./addresses/AddressModel";
import BusinessModel from "./businesses/BusinessModel";
import CalendarMetadataModel from "./calendar-metadata/CalendarMetadataModel";
import CountryCodeModel from "./country-codes/CountryCodesModel";
import ServiceModel from "./services/ServiceModel";

export default interface IBusinessesState {
  readonly addresses: AddressModel[];
  readonly services: ServiceModel[];
  readonly business: BusinessModel;
  readonly calendar_metadata: CalendarMetadataModel;
  readonly country: CountryModel;
  readonly country_code: CountryCodeModel;
}
