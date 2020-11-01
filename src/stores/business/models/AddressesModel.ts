import { BaseModel } from "sjs-base-model";

export default class AddressesModel extends BaseModel {
    public readonly street_no: string = "";
    public readonly apt_no: string = "";
    public readonly province_state: string = "";
    public readonly postal_code: string = "";
    public readonly businesses_id: number = -1;
    public readonly country_id: number = -1;
    
    /*
     * Client-Side properties (Not from API)
     */
    
    constructor(data: Partial<AddressesModel>) {
      super();
  
      this.update(data);
    }
  }
  