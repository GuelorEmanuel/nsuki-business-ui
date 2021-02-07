import React from "react";
import { Container, Header, Input, List, Button, TextArea, Form, Label } from "semantic-ui-react"
import { IFormFieldData } from "../../../home-page/components/bare-min-information/Interface"


interface IProps {
    readonly dataOnChange: (arg: IFormFieldData) => void;
    readonly requiredFields: Array<string>;
    readonly errorFlag: boolean;
    readonly errorFields: Array<string>;
    readonly serviceTitle: string;
    readonly price: number; 
    readonly duration: number;
    readonly description: string;
    readonly location: string;
}


interface IState {
    availableAtClientAdded : boolean;
    availableAtSpecificAddressAdded : boolean;
    duration: string; 
    serviceTitle: string;
    price: string; 
    description: string;
    error: boolean;  
}


class Service extends React.Component<IProps, IState> {
    private dataOnChange:any
    
    constructor(props: IProps) {
        super(props);

        this.dataOnChange = this.props.dataOnChange

        this.state = {
            availableAtSpecificAddressAdded: this.props.location.search("business") > -1,
            availableAtClientAdded: this.props.location.search("client") > -1,
            duration: this.props.duration.toString(),
            price: this.props.price.toString(),
            serviceTitle: this.props.serviceTitle,
            description: this.props.description,
            error: props.errorFlag
        };
    
    }

    onHandleChangeNumeric(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        let name = e.target.name;

        if (!Number(value) && value.length > 0) {
            return;
        }
        this.dataOnChange({fieldName: name, value: value});
        this.setState({[name]: value, error: this.props.errorFlag } as Pick<IState, keyof IState>);
    }

    componentDidUpdate(nextProps: IProps) {
        const { errorFlag } = this.props
        
        if (nextProps.errorFlag !== errorFlag) {
            if (errorFlag) {
                this.setState(() => ({error: errorFlag}))
            }
        }

     }

    public render(): JSX.Element { 
        const {dataOnChange, requiredFields, errorFields } = this.props;

        return <>
            <Container>
                <Header as='h4' textAlign='left'>
                    {requiredFields.indexOf("service") > -1 ? "Service*" : "Service"}
                </Header>
                <Input focus
                    labelPosition='left'
                    name="service"
                    defaultValue={this.state.serviceTitle}
                    fluid
                    onChange={ e => {
                        this.dataOnChange({fieldName: "service", value: e.target.value});
                    }
               }>
                </Input>
                { this.state.error && errorFields.indexOf("service") > -1 && 
                                <Label basic color='red' style={{marginTop: '0.5em'}}>
                                    Please provide service 
                                </Label>
                            } 
                <Header as='h4' textAlign='left'>
                    {requiredFields.indexOf("serviceLocation") > -1 ? "Location*" : "Location"}
                </Header>
                <List>
                    <List.Item>
                        { this.state.availableAtSpecificAddressAdded === false &&
                            <div>
                                <Button circular icon='plus' color='green' name='serviceLocation'  
                                    onClick={e => {
                                        // Check other service location option is already added
                                        // Then add both
                                        if(this.state.availableAtClientAdded) {
                                            dataOnChange({fieldName: "serviceLocation", value: "business,client"});        
                                        } else { // Otherwise just add one
                                            dataOnChange({fieldName: "serviceLocation", value: "business"});        
                                        }
                                        this.setState((state, props) => ({availableAtSpecificAddressAdded: true}))
                                    }
                                }/> Available at specified address 
                            </div> 
                        }
                        { this.state.availableAtSpecificAddressAdded === true &&
                            <div>
                                <Button circular icon='minus' color='red' name='serviceLocation'  
                                    onClick={e => { 
                                            // Check other service location option is already added
                                            // Then just keep the other service.
                                            if(this.state.availableAtClientAdded) {
                                                dataOnChange({fieldName: "serviceLocation", value: "client"});        
                                            } else { // Otherwise, just assign empty list
                                                dataOnChange({fieldName: "serviceLocation", value: ""});        
                                            }
                                    
                                            this.setState((state, props) => ({availableAtSpecificAddressAdded: false}))
                                        }
                                }/> Available at specified address 
                            </div> 
                        } 
                    </List.Item>
                    <List.Item style={{ marginTop: '0.5em'}}>
                        { this.state.availableAtClientAdded === false &&
                          <div>
                                <Button circular icon='plus' color='green' name='serviceLocation'
                                    onClick={e => {
                                        // Check other service location option is already added
                                        // Then, we need to have both options in the list
                                        if(this.state.availableAtSpecificAddressAdded) {
                                            dataOnChange({fieldName: "serviceLocation", value: "business,client"});        
                                        } else { // Otherwise, we just need to add just this option
                                            dataOnChange({fieldName: "serviceLocation", value: "client"});        
                                        }
                                        this.setState((state, props) => ({availableAtClientAdded: true}))
                                    }
                                }/> Available at client's location
                          </div>
                        }
                        { this.state.availableAtClientAdded === true &&
                          <div>
                                <Button circular icon='minus' color='red' name='serviceLocation'
                                    onClick={e => {
                                        // Check other service location option is already added
                                        // Then, we need to have keep that service in the list
                                        if(this.state.availableAtSpecificAddressAdded) {
                                            dataOnChange({fieldName: "serviceLocation", value: "business"});        
                                        } else { // Otherwise, remove both and keep the list empty
                                            dataOnChange({fieldName: "serviceLocation", value: ""});        
                                        }
                                        this.setState((state, props) => ({availableAtClientAdded: false}))
                                    }
                                }/> Available at client's location
                          </div>
                        }
                    </List.Item>      
                </List>
                { this.state.error && errorFields.indexOf("serviceLocation") > -1 && 
                                <Label basic color='red' style={{marginTop: '0.5em'}}>
                                    Please provide service location
                                </Label>
                            } 
                <Header as='h4' textAlign='left'>
                    {requiredFields.indexOf("duration") > -1 ? "Duration in minutes*" : "Duration"}
                </Header>
                <Input 
                    labelPosition='left'
                    name="duration"
                    fluid
                    value={this.state.duration}
                    onChange={ e => {
                            this.onHandleChangeNumeric(e);
                        }
                    }>
                </Input>
                { this.state.error && errorFields.indexOf("duration") > -1 && 
                                <Label basic color='red' style={{marginTop: '0.5em'}}>
                                    Please provide duration
                                </Label>
                            } 
                <Header as='h4' textAlign='left'>
                    {requiredFields.indexOf("price") > -1 ? "Price*" : "Price"}
                </Header>
                <Input 
                    labelPosition='left'
                    name="price"
                    fluid
                    value={this.state.price}
                    onChange={ e => {
                        this.onHandleChangeNumeric(e);
                    }
                }>
                </Input>
                { this.state.error && errorFields.indexOf("price") > -1 && 
                                <Label basic color='red' style={{marginTop: '0.5em'}}>
                                    Please provide price
                                </Label>
                            } 
                <Header as='h4' textAlign='left'>{requiredFields.indexOf("description") > -1 ? "Description*" : "Description"}</Header>
                <Form>
                    <TextArea rows='3' 
                        defaultValue={this.state.description}
                        onChange={ (_, {value}) => {
                            this.dataOnChange({fieldName: "descripton", value: value});
                        }
                }/></Form>
            </Container>
        </>
    }    

}

export default Service
