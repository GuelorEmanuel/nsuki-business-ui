import React from 'react';
import { Form, Header, Input, Label } from 'semantic-ui-react'
import { IFormFieldData } from '../../Interface'

interface IProps {
    readonly dataOnChange: (arg: IFormFieldData) => void;
    readonly depositType: string;
    readonly amount: string;
    readonly requiredFields: Array<string>;
    readonly errorFlag: boolean;
    readonly errorFields: Array<string>;
}

interface IState {
    depositType: number;
    amount: string;
    error: boolean;  
    update: boolean;
}

class Deposit extends React.Component<IProps, IState> {
    private dataOnChange:any

    constructor(props: IProps) {
        super(props);

        this.dataOnChange = this.props.dataOnChange
        
        switch(props.depositType) {
            case "None": { 
                this.state = {
                    depositType: 0,
                    amount: "",
                    error: props.errorFlag,
                    update: false
                };
                break;
            }
            case "Fixed": { 
                this.state = {
                    depositType: 1,
                    amount: props.amount,
                    error: props.errorFlag,
                    update: false 
                };
                break;
            }
            case "Percentage": { 
                this.state = {
                    depositType: 2,
                    amount: props.amount,
                    error: props.errorFlag,
                    update: false
                }; 
                break;
            }
            default: { // First time form is loaded
                this.state = {
                    depositType: 0,
                    amount: "",
                    error: props.errorFlag,
                    update: false
                }; 
                this.dataOnChange({fieldName: "depositType", value: "None"});
                break;
            }
        }
    }

    componentDidUpdate(nextProps: IProps) {
        const { errorFlag } = this.props
        
        if (nextProps.errorFlag !== errorFlag) {
            if (errorFlag) {
                this.setState((state, props) => ({error: errorFlag}))
            }
        }

     }

    onHandleChangeNumeric(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        let name = e.target.name;

        if (!Number(value) && value.length > 0) {
            return;
        }
        this.dataOnChange({fieldName: name, value: value});
        this.setState({[name]: value, error: this.props.errorFlag, depositType: this.state.depositType } as Pick<IState, keyof IState>);
    }

    public render(): JSX.Element { 
        const {dataOnChange, depositType, amount, requiredFields, errorFields} = this.props;
        
        return <>
            <Form>
                <div className="ui grid">
                    <div className="row left aligned">
                        <div className="fifteen wide column">
                            <Header as='h3' textAlign='left'>Does this service require a deposit?</Header>
                        </div>
                    </div>
                    <div className="row">
                        <div className="centered fifteen wide column">
                            <div className="fluid big ui buttons">
                                {/* Those ones with 'active' css class is just selected state */}
                                { this.state.depositType === 0 &&
                                    <button className="ui active button">No Deposit</button>
                                }
                                { this.state.depositType !== 0 &&
                                    <button className="ui button"
                                            onClick={e => {
                                                dataOnChange({fieldName: "depositType", value: "None"});
                                                this.setState((state, props) => ({depositType: 0}))
                                            }}>No Deposit</button>
                                }
                                { this.state.depositType !== 1 &&
                                    <button className="ui button"
                                            onClick={e => {
                                                dataOnChange({fieldName: "depositType", value: "Fixed"});
                                                this.setState((state, props) => ({depositType: 1}))
                                                }
                                            }>Fixed</button>
                                }
                                { this.state.depositType === 1 &&
                                    <button className="ui active button">Fixed</button>
                                }
                                { this.state.depositType !== 2 &&
                                    <button className="ui button"
                                            onClick={e => {
                                                dataOnChange({fieldName: "depositType", value: "Percentage"});
                                                this.setState((state, props) => ({depositType: 2}))
                                            }}>Percentage</button>
                                }
                                { this.state.depositType === 2 &&
                                    <button className="ui active button">Percentage</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="centered row">
                        <div className="seven wide column centered aligned">
                            {/* Based on selected deposit type, we are showing different type of inputbox */}
                            { this.state.depositType === 0 &&
                            <Input placeholder='Not Applicable' labelPosition='right' disabled={true}></Input>
                            }
                            { this.state.depositType === 1 &&
                            <Input focus
                                    placeholder={requiredFields.indexOf("amount") > -1 ? "Deposit Amount *" : "Deposit Amount"}
                                    labelPosition='right'
                                    name="amount"
                                    value={this.state.amount}
                                    onChange={ e => {
                                            this.onHandleChangeNumeric(e);
                                            this.setState((state, props) => ({update: true}));
                                        }
                                    }>
                                    <Label basic>$</Label>
                                    <input />
                                    { this.state.error && errorFields.indexOf("amount") > -1 && 
                                        <Label basic color='red'>
                                        Please provide deposit 
                                        </Label>
                                    }
                            </Input>
                            }
                            { this.state.depositType === 2 &&
                            <Input focus
                                    placeholder={requiredFields.indexOf("amount") > -1 ? "Deposit Percentage *" : "Deposit Percentage"}
                                    labelPosition='right'
                                    name="amount"
                                    value={this.state.amount}
                                    onChange={ e => {
                                            this.onHandleChangeNumeric(e);
                                            this.setState((state, props) => ({update: true}));
                                        }
                                    }>
                                    <input />
                                    <Label basic>%</Label>
                                    { this.state.error && errorFields.indexOf("amount") > -1 && 
                                        <Label basic color='red'>
                                        Please provide deposit 
                                        </Label>
                                    }
                            </Input>
                            }
                        </div>
                       
                    </div>
                </div>
            </Form>
        </>
    }

}

export default Deposit
