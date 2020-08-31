import { Button, Header, Container} from "semantic-ui-react"
import CalendarImport from "./components/calendar-import/CalendarImport"
import AddService from "./components/add-service/AddService"
import Deposit from "./components/deposit/Deposit"
import { IFormFieldData } from "./Interface"
import React from "react";

interface IProps {}
interface IState {
  activeForm: number;
  error: boolean;
}

const options = [
  {
    key: "Calendar_1",
    text: "Business",
    value: "Business"
  },
  {
    key: "Calendar_2",
    text: "Personal",
    value: "Personal"
  }
]

const loggedInEmail = "admin@gmail.com"
let addServiceDataMap = new Map();
let errorFieldsSet = new Set<string>();

const onDataChangeHandler = function (data:IFormFieldData) {
    addServiceDataMap.set(data.fieldName,data.value);
    errorFieldsSet.delete(data.fieldName);
};

class BareMinimumInformation extends React.Component<IProps, IState> {
    private requiredFieldsForCalendarForm = ["calendar"];
    private requiredFieldsForAddServiceForm = ["appointmentName","durationInMinute","price","serviceLocation"];
    private requiredFieldsForDepositForm = ["amount"];

    constructor(props: IProps) { 
        super(props);

        this.state = {
            activeForm: 1,
            error: false
        };
    }

    validateFormFields(formFields: Array<string>):boolean {
        for(let field of formFields) {
            if(!addServiceDataMap.has(field) || addServiceDataMap.get(field).trim()==="") {
                errorFieldsSet.add(field);
            }
        }
        
        if(errorFieldsSet.size > 0) return false; 
        
        return true;    
    }

    public render(): JSX.Element { 
        
        return <>
        <Container>
            { this.state.activeForm == 1 ?  
            <div className="ui grid">
                <div className="row">
                    <div className="centered sixteen wide column" >
                        <CalendarImport calendarList={options}
                                        loggedInEmail={loggedInEmail}
                                        selectedCalendar={addServiceDataMap.has("calendar") ? addServiceDataMap.get("calendar") : ""}
                                        dataOnChange={onDataChangeHandler}
                                        requiredFields={this.requiredFieldsForCalendarForm}
                                        errorFlag={this.state.error}
                                        errorFields={Array.from(errorFieldsSet.values())}/>
                    </div>
                </div>
                <div className="row">
                    <div className="centered seven wide column" >
                        <Button className="fluid ui formlink" 
                                onClick={() => {
                                        if(this.validateFormFields(this.requiredFieldsForCalendarForm)) {    
                                            this.setState((state, props) => ({activeForm: state.activeForm + 1, error: false}))
                                        } else {
                                            this.setState((state, props) => ({error: true}))
                                        }
                                    }
                                }>
                            Continue 
                        </Button>
                    </div>
                </div>
            </div>
            : null 
            }
            { this.state.activeForm == 2 ?
                <div className="ui grid formcontainer" >
                    <div className="row white">
                        <div className="sixteen wide left aligned column" >
                            <div className="ui link items">
                                <div className="item" 
                                     onClick={() => {
                                            if(!this.state.error) { 
                                                this.setState((state, props) => ({activeForm: state.activeForm - 1}))
                                            }
                                        }
                                    }>
                                     <Header as='h3' textAlign='left'>← Choose Calendar</Header>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="centered sixteen wide column" >
                            <AddService dataOnChange={onDataChangeHandler}
                                        appointmentName={addServiceDataMap.has("appointmentName") ? addServiceDataMap.get("appointmentName") : ""}
                                        durationInMinute={addServiceDataMap.has("durationInMinute") ? addServiceDataMap.get("durationInMinute") : ""}                           
                                        price={addServiceDataMap.has("price") ? addServiceDataMap.get("price") : ""}
                                        description={addServiceDataMap.has("description") ? addServiceDataMap.get("description") : ""}
                                        selectedServiceLocation={addServiceDataMap.has("serviceLocation") 
                                                            ? addServiceDataMap.get("serviceLocation").split(",") : []}
                                        requiredFields={this.requiredFieldsForAddServiceForm}
                                        errorFlag={this.state.error}
                                        errorFields={Array.from(errorFieldsSet.values())}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="ten wide column"></div>
                        <div className="four wide column">
                            <Button className="fluid ui formlink" 
                                    onClick={() => {
                                            if(this.validateFormFields(this.requiredFieldsForAddServiceForm)) {    
                                                this.setState((state, props) => ({activeForm: state.activeForm + 1, error: false}))
                                            } else {
                                                this.setState((state, props) => ({error: true}))
                                            }
                                        }    
                                    }>
                                Continue 
                            </Button>
                        </div>
                    </div>
                </div>	
                : null 
            }
            { this.state.activeForm == 3 ?
                <div className="ui grid formcontainer">
                    <div className="row white">
                        <div className="sixteen wide left aligned column" >
                            <div className="ui link items">
                                <div className="item" 
                                     onClick={() => {
                                            if(!this.state.error) { 
                                                this.setState((state, props) => ({activeForm: state.activeForm - 1}))
                                            }
                                        }
                                     }>
                                    <Header as='h3' textAlign='left'>← Add Service</Header>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="centered sixteen wide column" >
                            <Deposit dataOnChange={onDataChangeHandler} 
                                     requiredFields={this.requiredFieldsForDepositForm}
                                     depositType={addServiceDataMap.has("depositType") ? addServiceDataMap.get("depositType") : ""}
                                     amount={addServiceDataMap.has("amount") ? addServiceDataMap.get("amount") : ""}
                                     errorFlag={this.state.error}
                                     errorFields={Array.from(errorFieldsSet.values())}/>
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="row">
                        <div className="four wide centered middle aligned column">
                            <Button className="fluid ui formlink" 
                                    onClick={() => {
                                        if(addServiceDataMap.get("depositType") === "None" || this.validateFormFields(this.requiredFieldsForDepositForm)) {    
                                            this.setState((state, props) => ({activeForm: state.activeForm + 1, error: false}))
                                        } else {
                                            this.setState((state, props) => ({error: true}))
                                        }
                                    }}>
                                Done
                            </Button>
                        </div>
                    </div>
                </div>	
                : null
            }
            </Container>
        </>
    }
}

export default BareMinimumInformation