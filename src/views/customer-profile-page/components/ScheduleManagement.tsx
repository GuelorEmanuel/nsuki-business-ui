import { Header, Container, Button, Icon, Segment, Divider } from "semantic-ui-react"
import React from "react";
import { IAppointment } from "../Interface"


interface IState {}

interface IProps {
    readonly appointmentList: Array<IAppointment>;
}

class ScheduleManagement extends React.Component<IProps, IState> {
    
    public render(): JSX.Element { 
        const { appointmentList } = this.props;

        return <>
        <Container>
            <Header as="h2">Appointments</Header>
            <div>
                <Button icon labelPosition='left'>
                    <Icon name='add circle'/> New Appointment
                </Button>
            </div>
            <div style={{marginTop: '2em'}}> 
                <Header as="h3"> Upcoming </Header>
                <Segment>
                    { appointmentList.map(appointment => (
                        <div>
                            <Header as="h4">
                                <Icon name='calendar alternate outline'/>
                                    {appointment.dateTime.toDateString()} - {appointment.dateTime.getHours()} : {appointment.dateTime.getMinutes()}
                            </Header>
                            <div className="ui two column grid">
                                <div className="four column centered row">
                                    <div className="column">
                                        <Header as="h5">Service</Header>
                                    </div>
                                    <div className="column">
                                        {appointment.serviceName}
                                    </div>
                                </div>
                                <div className="four column centered row">
                                    <div className="column">
                                        <Header as="h5">Duration</Header>
                                    </div>
                                    <div className="column">
                                        {appointment.duration} Hour
                                    </div>

                                </div>
                                <div className="center aligned row">
                                    <div className="column"><Button positive fluid>Reschedule</Button></div>
                                    <div className="column"><Button negative fluid>Cancel</Button></div>
                                </div>
                            </div>

                            { appointmentList[appointmentList.length-1] !== appointment &&  
                                <Divider section />
                            }

                        </div>                        

                        ))
                    }
                </Segment>
            
            </div>

        </Container>
        </>
    }
}

export default ScheduleManagement
