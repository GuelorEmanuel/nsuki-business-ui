import BusinessesEffect from "./BusinessesEffect";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import IStore from "../../models/IStore";
// import ShowModel from './models/shows/ShowModel';
// import EpisodeModel from './models/episodes/EpisodeModel';
// import CastModel from './models/cast/CastModel';
import BusinessModel from "./models/businesses/BusinessModel";
import AddressModel from "./models/addresses/AddressModel";
import ServiceModel from "./models/services/ServiceModel";
import CalendarMetadataModel from "./models/calendar-metadata/CalendarMetadataModel";
import CountryCodeModel from "./models/country-codes/CountryCodesModel";
import CountryModel from "stores/shows/models/shows/CountryModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | AddressModel[]
  | ServiceModel[]
  | BusinessModel
  | CalendarMetadataModel
  | CountryCodeModel
  | CountryModel;

export default class BusinessesAction {
  public static readonly REQUEST_BUSINESS: string =
    "ShowsAction.REQUEST_BUSINESS";
  public static readonly REQUEST_BUSINESS_FINISHED: string =
    "ShowsAction.REQUEST_BUSINESS_FINISHED";

  //   public static readonly REQUEST_EPISODES: string = 'ShowsAction.REQUEST_EPISODES';
  //   public static readonly REQUEST_EPISODES_FINISHED: string = 'ShowsAction.REQUEST_EPISODES_FINISHED';

  //   public static readonly REQUEST_CAST: string = 'ShowsAction.REQUEST_CAST';
  //   public static readonly REQUEST_CAST_FINISHED: string = 'ShowsAction.REQUEST_CAST_FINISHED';

  //   public static readonly REQUEST_ERROR: string = 'ShowsAction.REQUEST_ERROR';
  //   public static readonly REQUEST_ERROR_FINISHED: string = 'ShowsAction.REQUEST_ERROR_FINISHED';

  public static requestBusiness(): any {
    return async (
      dispatch: ReduxDispatch<ActionUnion>,
      getState: () => IStore
    ): Promise<void> => {
      const showId: string = getState().shows.currentShowId;

      await ActionUtility.createThunkEffect<BusinessModel>(
        dispatch,
        BusinessesAction.REQUEST_BUSINESS,
        BusinessesEffect.requestBusiness,
        showId
      );
    };
  }

  public static submitOnboardingForm(formData: any): any {
    return async (
      dispatch: ReduxDispatch<ActionUnion>,
      getState: () => IStore
    ): Promise<void> => {
      const token: string = getState().auth.nbs_access_token;

      await ActionUtility.createThunkEffect<BusinessModel>(
        dispatch,
        BusinessesAction.REQUEST_BUSINESS,
        BusinessesEffect.submitOnboardingForm,
        formData,
        token
      );
    };
  }

  //   public static requestEpisodes(): any {
  //     return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
  //       const showId: string = getState().shows.currentShowId;

  //       await ActionUtility.createThunkEffect<EpisodeModel[]>(dispatch, ShowsAction.REQUEST_EPISODES, ShowsEffect.requestEpisodes, showId);
  //     };
  //   }

  //   public static requestCast(): any {
  //     return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
  //       const showId: string = getState().shows.currentShowId;

  //       await ActionUtility.createThunkEffect<CastModel[]>(dispatch, ShowsAction.REQUEST_CAST, ShowsEffect.requestCast, showId);
  //     };
  //   }

  //   public static requestError(): any {
  //     return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
  //       await ActionUtility.createThunkEffect<any>(dispatch, ShowsAction.REQUEST_ERROR, ShowsEffect.requestError);
  //     };
  //   }
}
