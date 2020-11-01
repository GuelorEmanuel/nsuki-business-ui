import { BaseModel } from "sjs-base-model";

export default class PricesModel extends BaseModel {
    public readonly travelling_fee: number = 0;
    public readonly base_price: number = 0;
    public readonly deposit: number = 0;
    public readonly deposits_id: number = -1;
    
    /*
     * Client-Side properties (Not from API)
     */
    
    constructor(data: Partial<PricesModel>) {
      super();
  
      this.update(data);
    }
  }
  