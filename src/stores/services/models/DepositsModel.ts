import { BaseModel } from "sjs-base-model";

export default class DepositsModel extends BaseModel {
    public readonly id: number = 0;
    public readonly type: string = "";
    
    /*
     * Client-Side properties (Not from API)
     */
    
    constructor(data: Partial<DepositsModel>) {
      super();
  
      this.update(data);
    }
  }
  