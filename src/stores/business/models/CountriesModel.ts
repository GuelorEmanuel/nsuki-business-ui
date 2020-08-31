import { BaseModel } from "sjs-base-model";

export default class CountriesModel extends BaseModel {
    public readonly id: number = -1;
    public readonly name: string = "";
    
    /*
     * Client-Side properties (Not from API)
     */
    
    constructor(data: Partial<CountriesModel>) {
      super();
  
      this.update(data);
    }
  }
  