import { BaseModel } from "sjs-base-model";

export default class ServiceLocationsModel extends BaseModel {
    public readonly id: number = 0;
    public readonly location: string = "";
    
    /*
     * Client-Side properties (Not from API)
     */
    
    constructor(data: Partial<ServiceLocationsModel>) {
      super();
  
      this.update(data);
    }
  }
  