import { BaseModel } from "sjs-base-model";

export default class CountrieCodesModel extends BaseModel {
    public readonly code: number = 0;
    public readonly country_id: number = -1;
    
    /*
     * Client-Side properties (Not from API)
     */
    
    constructor(data: Partial<CountrieCodesModel>) {
      super();
  
      this.update(data);
    }
  }
  