import React from "react";
import { Dropdown, Form, Header, Label } from "semantic-ui-react"
import { IFormFieldData } from "../../Interface"

interface IProps {
    readonly dataOnChange: (arg: IFormFieldData) => void;
    readonly appointmentName: string;
    readonly durationInMinute: string;
    readonly price: string;
    readonly description: string;
    readonly selectedServiceLocation: Array<string>;
    readonly requiredFields: Array<string>;
    readonly errorFlag: boolean;
    readonly errorFields: Array<string>;
}

interface IState {
    durationInMinute: string;
    price: string;    
    error: boolean; 
    update: boolean;
}

const serviceLocation = [
  { key: 'AtBusiness', text: 'Available at the specified address', value: 'atBusiness' },
  { key: 'AtClientPlace', text: 'Available at client\'s location', value: 'atClientLocation' }
]

const getValueBasedOnProp = function(prop: any):string {
    if(prop == undefined || prop == null) return "";
    return prop;
}

class AddService extends React.Component<IProps, IState> {
    
    private dataOnChange:(arg: IFormFieldData) => void
    
    constructor(props: IProps) {
        super(props);
        this.dataOnChange = props.dataOnChange
        this.state = { 
            price: props.price,
            durationInMinute: props.durationInMinute,
            error: props.errorFlag,
            update: false
        };
    }

    componentDidUpdate(nextProps: IProps) {
        const { errorFlag } = this.props
        
        if (nextProps.errorFlag !== errorFlag) {
            if (errorFlag) {
                this.setState((state, props) => ({error: errorFlag}))
            }
        }

     }

    /*
        Restrict numeric fields to numbers only
    */
    onHandleChangeNumeric(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        let name = e.target.name;

        if (!Number(value) && value.length > 0) {
            return;
        }
        this.dataOnChange({fieldName: name, value: value});
        this.setState({[name]: value, error: this.props.errorFlag } as Pick<IState, keyof IState>);
    }

    public render(): JSX.Element { 
        const { appointmentName, description, selectedServiceLocation,requiredFields, errorFields} = this.props;
        
        return <>
            <Form>
                <div className="ui grid">
                    <div className="row left aligned">
                        <div className="fifteen wide column">
                            <Header as='h3' textAlign='left'>Add your first service</Header>
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <input placeholder={requiredFields.indexOf("appointmentName") > -1 ? "Appointment Name *" : "Appointment Name"}
                                   name="appointmentName"
                                   onChange={ e => {
                                            this.dataOnChange({fieldName: "appointmentName", value: e.target.value});
                                            this.setState((state, props) => ({update: true}));
                                        }
                                   }
                                   defaultValue={getValueBasedOnProp(appointmentName)} /> 
                                   
                            { this.state.error && errorFields.indexOf("appointmentName") > -1 && 
                                <Label basic color='red'>
                                    Please provide an appointment name
                                </Label>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <input placeholder={requiredFields.indexOf("durationInMinute") > -1 ? "Duration (Minutes) *" : "Duration (Minutes)"}
                                   name="durationInMinute"
                                   onChange={ e => {
                                            this.onHandleChangeNumeric(e) 
                                            this.setState((state, props) => ({update: true}));
                                        }
                                    }
                                   value={this.state.durationInMinute}/>
                            { this.state.error && errorFields.indexOf("durationInMinute") > -1 && 
                                <Label basic color='red'>
                                    Please provide service duration in minute
                                </Label>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <input placeholder={requiredFields.indexOf("price") > -1 ? "Price ($100.00) *" : "Price ($100.00)"}
                                   name="price"
                                   onChange={ e => {
                                            this.onHandleChangeNumeric(e) 
                                            this.setState((state, props) => ({update: true}));
                                        }
                                   }
                                   value={this.state.price}/>
                            { this.state.error && errorFields.indexOf("price") > -1 && 
                                <Label basic color='red'>
                                    Please provide service's price 
                                </Label>
                            }       
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <input placeholder={requiredFields.indexOf("description") > -1 ? "Description *" : "Description"}
                                   name="description"
                                   onChange={ e => {
                                            this.dataOnChange({fieldName: "description", value: e.target.value})
                                            this.setState((state, props) => ({update: true}));
                                        }
                                    }
                                   defaultValue={getValueBasedOnProp(description)}/>

                            { this.state.error && errorFields.indexOf("description") > -1 && 
                                <Label basic color='red'>
                                    Please provide service's description
                                </Label>
                            }       
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <Dropdown
                                placeholder={requiredFields.indexOf("serviceLocation") > -1 ? "Service Location *" : "Service Location"} 
                                name="serviceLocation"
                                fluid multiple selection 
                                options={serviceLocation}
                                defaultValue={ getValueBasedOnProp(selectedServiceLocation) }
                                onChange={(_, result) => {
                                                this.dataOnChange(
                                                    { fieldName: "serviceLocation", 
                                                        value: (result.value === null || result.value === undefined ? "" : (result.value as Array<string>).join(','))
                                                    })
                                                this.setState((state, props) => ({update: true}));
                                            }
                                        }
                            />
                            { this.state.error && errorFields.indexOf("serviceLocation") > -1 && 
                                <Label basic color='red'>
                                    Please provide service location
                                </Label>
                            } 
                        </div>
                    </div>
                </div>
            </Form>
        </>  

    }

}

export default AddService