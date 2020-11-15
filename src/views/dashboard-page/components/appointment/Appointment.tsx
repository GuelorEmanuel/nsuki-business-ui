import { Card, Image, Header } from "semantic-ui-react";
import React from "react";
import { IAppointment } from "../../Interface";

interface IProps {
    readonly appointmentList: IAppointment[];
}

class Appointment extends React.Component<IProps> {
    
    public render(): JSX.Element { 
        
        return <>
            <Card.Group>
                 {
                    this.props.appointmentList.map((appointment, _) => {
                        return <>
                            <Card raised >
                                <Card.Content>
                                    <Image
                                        circular
                                        floated='right'
                                        size='tiny'
                                        src={appointment.imageLink}
                                    />
                                    <Card.Header>{appointment.clientName}</Card.Header>
                                    <Card.Meta>{appointment.dateTime.toLocaleTimeString('en-US')/* this should be coming from environment variable*/ }</Card.Meta>
                                    <Card.Description>
                                        <Header>{appointment.appointmentType}</Header>
                                    </Card.Description>
                                </Card.Content>
                            </Card> 
                        </>   
                    })
                 }
            </Card.Group>    
        
            
        </>
    }
}

export default Appointment

