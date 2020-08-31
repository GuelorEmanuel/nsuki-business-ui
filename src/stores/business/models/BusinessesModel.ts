import { BaseModel } from "sjs-base-model";

export default class BusinessesModel extends BaseModel {
    public readonly title: string = "";
    public readonly phone_number: string = "";
    public readonly country_code_id: number = 0;
    
    /*
     * Client-Side properties (Not from API)
     */
    
    constructor(data: Partial<BusinessesModel>) {
      super();
  
      this.update(data);
    }
  }
  