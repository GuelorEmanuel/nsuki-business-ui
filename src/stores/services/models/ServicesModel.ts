import { BaseModel } from "sjs-base-model";

export default class ServicesModel extends BaseModel {
    public readonly name: string = "";
    public readonly price_id: number = -1;
    public readonly duration: number = 0;
    public readonly description: string = "";
    public readonly serviceLocations_id: number = -1;
  
    
    /*
     * Client-Side properties (Not from API)
     */
    
    constructor(data: Partial<ServicesModel>) {
      super();
  
      this.update(data);
    }
  }
  