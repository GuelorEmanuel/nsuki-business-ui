import React from 'react';
import { Dropdown, Form, Header, Label } from 'semantic-ui-react'
import { IFormFieldData, IDropDownItemProps } from '../../Interface'
import styles from './CalendarImport.module.scss';

interface IProps {
    readonly calendarList: IDropDownItemProps[];
    readonly selectedCalendar: string;
    readonly dataOnChange: (arg: IFormFieldData) => void;
    readonly loggedInEmail: string;
    readonly requiredFields: Array<string>;
    readonly errorFlag: boolean;
    readonly errorFields: Array<string>;
}

interface IState {
    error: boolean;  
}
interface IStateToProps {}


class CalendarImport extends React.Component<IProps, IState> {
    private a:boolean = false;

    constructor(props: IProps) {
        super(props);

        this.state = {
            error: props.errorFlag
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

    public render(): JSX.Element { 
        const {calendarList, selectedCalendar, dataOnChange, loggedInEmail, requiredFields, errorFields} = this.props;
        
        return <>
            <div className='ui container'>
                <Header as='h5' textAlign='center'>Which calendar should Nsunki use to schedule?
                    { requiredFields.indexOf('calendar') > -1 &&
                        <span className={ styles.requiredStyle }>*</span>
                    }
                </Header>
                <Form className='ui form'>
                    <div className='field'>
                        <div className='fields'>
                            <div className='three wide field'></div>
                            <div className="ten wide field">
                                <Dropdown
                                  placeholder='Select Calendar'
                                  name="calendar"
                                  fluid
                                  selection
                                  options={calendarList}
                                  defaultValue={selectedCalendar !== "" ? selectedCalendar : ""}
                                  onChange={(event, result) => {
                                                dataOnChange({ fieldName: "calendar", 
                                                    value: (result.value == null || result.value == undefined ? "" : (result.value as string))
                                                });
                                                this.setState((state, props) => ({error: false}))
                                              }}
                                />
                                { this.state.error && errorFields.indexOf("calendar") > -1 &&
                                    <Label basic color='red' pointing>
                                        Please select a calendar
                                    </Label>
                                }
                            </div>
                          <div className='three wide field'></div>
                        </div>
                    </div>
                </Form>
                <div>
                    <Header as='h5' textAlign='center'>Logged in as {loggedInEmail}</Header>
                </div>
            </div>
        </>
    }    
}

export default CalendarImport;
