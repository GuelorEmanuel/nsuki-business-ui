import { Container, Grid, Button } from "semantic-ui-react"
import Deposit from "../home-page/components/bare-min-information/components/deposit/Deposit"
import Service from "./components/service/Service"
import { IFormFieldData } from "../home-page/components/bare-min-information/Interface"
import React from "react";

interface IProps {}
interface IState {
    error: boolean;
}


let dataMap = new Map(); // Keep track of changes in the required fields
let errorFieldsSet = new Set<string>();

const onDataChangeHandler = function (data:IFormFieldData) {
    dataMap.set(data.fieldName,data.value);
};

class ServicePage extends React.Component<IProps, IState> {
   private requiredFieldsForDepositForm = ["depositType","amount"];
   private requiredFieldsForServiceForm = ["service", "serviceLocation", "duration", "price"];

   constructor(props: IProps) { 
        super(props);
        
        this.state = {
            error: false
        };

        // To integrate this page, you will need to set the map with the values you would like to 
        // populate the form fields. Otherwise, the fields will be considered empty and user won't
        // be able to navigate. The following is just an example.
        dataMap.set(this.requiredFieldsForServiceForm[0], "Hair Styling");
        dataMap.set(this.requiredFieldsForServiceForm[1], "business");
        dataMap.set(this.requiredFieldsForServiceForm[2], "90");
        dataMap.set(this.requiredFieldsForServiceForm[3], "58.66");
        dataMap.set("description", "This is just an example test");
        dataMap.set(this.requiredFieldsForDepositForm[0], "Fixed");
        dataMap.set(this.requiredFieldsForDepositForm[1], "20");
    }

    validateFormFields():boolean {

        dataMap.forEach((value: string, key: string) => {
            if(this.requiredFieldsForServiceForm.indexOf(key) == -1 
                && this.requiredFieldsForDepositForm.indexOf(key) == -1) {
                return;
            }
            
            if(value.trim()==="") {
                errorFieldsSet.add(key);
            } else { // If data is already provided for that field, remove it from error list
                errorFieldsSet.delete(key);
            }


        });
        
        if(errorFieldsSet.size > 0) return false; 
        
        return true;    
    }


    public render(): JSX.Element { 
        return <>
        <Container>
            <Grid columns={2} style={{marginTop: 100, marginLeft: 90}}>
                <Grid.Row stretched>
                    <Grid.Column width='8' style={{paddingLeft: 50, paddingRight: 50}}>
                        <Service dataOnChange={onDataChangeHandler}
                                 requiredFields={this.requiredFieldsForServiceForm}
                                 errorFlag={this.state.error}
                                 errorFields={Array.from(errorFieldsSet.values())}
                                 serviceTitle={dataMap.get(this.requiredFieldsForServiceForm[0])}
                                 location={dataMap.get(this.requiredFieldsForServiceForm[1])}
                                 duration={Number(dataMap.get(this.requiredFieldsForServiceForm[2]))}
                                 price={Number(dataMap.get(this.requiredFieldsForServiceForm[3]))}
                                 description={dataMap.get("description")}
                                 />
                    </Grid.Column>
                    <Grid.Column width='8'>
                        <Deposit dataOnChange={onDataChangeHandler} 
                                    requiredFields={this.requiredFieldsForDepositForm}
                                    depositType={dataMap.get("depositType")}
                                    amount={dataMap.get("amount")}
                                    errorFlag={this.state.error}
                                    errorFields={Array.from(errorFieldsSet.values())}/>
                    
                        <div>
                            <Button positive size='large' attached='bottom' style={{marginTop: 240}}
                                   onClick={() => {
                                    if(this.validateFormFields()) {    
                                        // submit form here
                                        this.setState((state, props) => ({error: false}))
                                    } else {
                                        this.setState((state, props) => ({error: true}))
                                    }
                                }}>
                                Save
                            </Button>             
                        </div>
                        
                    </Grid.Column>   
                </Grid.Row>
                
            </Grid>
            
            
        </Container>
        </>
    }
}

export default ServicePage
