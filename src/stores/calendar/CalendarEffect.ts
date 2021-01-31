import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import HttpUtility from "../../utilities/HttpUtility";
import CalendarListModel from "./models/CalendarListModel";
import { AxiosResponse } from "axios";
import EffectUtility from "../../utilities/EffectUtility";

export default class CalendarEffect {
  public static async requestCalendar(
    token: string
  ): Promise<CalendarListModel | HttpErrorResponseModel> {
    //const endpoint: string = environment.api.shows.replace(':showId', showId);
    const endpoint: string = environment.api.calendar;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return EffectUtility.getToModel<CalendarListModel>(
      CalendarListModel,
      endpoint,
      undefined,
      params
    );
  }

  /**
   * This is only to trigger an error api response so we can use it for an example in the AboutPage
   */
  public static async requestError(): Promise<any | HttpErrorResponseModel> {
    const endpoint: string = environment.api.errorExample;
    const response:
      | AxiosResponse
      | HttpErrorResponseModel = await HttpUtility.get(endpoint);

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }
}
