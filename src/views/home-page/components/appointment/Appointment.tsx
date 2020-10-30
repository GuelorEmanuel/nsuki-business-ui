import { Container, Grid } from "semantic-ui-react"
import Profile from "./components/Profile"
import ScheduleManagement from "./components/ScheduleManagement"
import { IAppointment } from "./Interface"

import React from "react";
import { networkInterfaces } from "os";


interface IProps {}
interface IState {}

const appList:Array<IAppointment> = [
    {
        dateTime: new Date('2020/11/04 16:45'),
        serviceName: "Hair",
        duration: 1
    },
    {
        dateTime: new Date('2020/11/05 10:25'),
        serviceName: "Colour",
        duration: 2
    }

]

const imageList:Array<string> = [
    'https://i.pinimg.com/474x/db/0c/80/db0c80b6458ae43c315870f3412ddf15.jpg',
    'https://i.pinimg.com/474x/45/f8/f0/45f8f084002c627561fb7e5df8c6e33e.jpg',
    'https://i.pinimg.com/originals/b4/77/4c/b4774cb6380417f028f2f27ad87aa8b1.jpg',
    'https://i.pinimg.com/474x/a3/31/10/a331101b081dbfa7f503711f9db9046b.jpg',
    'https://i.pinimg.com/originals/6d/1e/6a/6d1e6af939efdd724b6262141f6f435e.jpg',
    'https://i.pinimg.com/originals/8d/b4/df/8db4df477e03a8c5e50a7afdd2bd2504.jpg',
    'https://i.pinimg.com/474x/b4/e7/9d/b4e79d99b61f4bac2243e4a91812d9d1.jpg',
    'https://i.pinimg.com/originals/ba/65/03/ba6503b3454814986cfb96a776be70c8.png'
]


class Appointment extends React.Component<IProps, IState> {
    
    constructor(props: IProps) { 
        super(props);
    }

    public render(): JSX.Element { 
        
        return <>
        <Container>
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Profile photoUriList={imageList} customerName="Beyonce Knowel" customerEmail="abc@gmail.com" customerPhoneNumber="123-231-2134"/>
                    </Grid.Column>
                    <Grid.Column>
                        <ScheduleManagement appointmentList={appList}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        </Container>
        </>
    }
}

export default Appointment


/*


 <Container>
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header as="h2">[NAME]</Header>
                        <div style={{overflowX: 'auto', whiteSpace: 'nowrap'}}> 
                            <Image.Group size='tiny' bordered>
                                <Image src='https://i.pinimg.com/474x/db/0c/80/db0c80b6458ae43c315870f3412ddf15.jpg' />
                                <Image src='https://i.pinimg.com/474x/45/f8/f0/45f8f084002c627561fb7e5df8c6e33e.jpg' />
                                <Image src='https://i.pinimg.com/originals/b4/77/4c/b4774cb6380417f028f2f27ad87aa8b1.jpg' />
                                
                                <Image src='https://i.pinimg.com/474x/a3/31/10/a331101b081dbfa7f503711f9db9046b.jpg' />
                                <Image src='https://i.pinimg.com/originals/6d/1e/6a/6d1e6af939efdd724b6262141f6f435e.jpg' />
                                <Image src='https://i.pinimg.com/originals/8d/b4/df/8db4df477e03a8c5e50a7afdd2bd2504.jpg' />

                                <Image src='https://i.pinimg.com/474x/b4/e7/9d/b4e79d99b61f4bac2243e4a91812d9d1.jpg' />
                                <Image src='https://i.pinimg.com/originals/ba/65/03/ba6503b3454814986cfb96a776be70c8.png' />
                                
                            </Image.Group>
                        </div>
                        <div style={{marginTop: '1em'}}> 
                            <Button icon labelPosition='left'>
                                <Icon name='add circle'/> Add Image
                            </Button>
                            <Header as="h3">Email</Header>
                            <span>[Email Address]</span>
                            <Header as="h3">Phone Number</Header>
                            <span>[Phone number]</span>
                        </div>
                        <div className="ui two column grid" style={{marginTop: '1em'}}>
                            <div className="four column centered row">
                                <div className="column">
                                    <Button positive fluid>Edit</Button>
                                </div>
                                <div className="column">
                                    <Button negative fluid>Delete</Button>
                                </div>
                            </div>
                        </div>
                        
                        
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h2">Appointments</Header>
                        <div>
                            <Button icon labelPosition='left'>
                                <Icon name='add circle'/> New Appointment
                            </Button>
                        </div>
                        <div style={{marginTop: '2em'}}> 
                            <Header as="h3"> Upcoming </Header>
                            <Segment>
                                <Header as="h4">
                                    <Icon name='calendar alternate outline'/>February 15th at 2:00PM - 3:00PM
                                </Header>
                                <div className="ui two column grid">
                                    <div className="four column centered row">
                                        <div className="column">
                                            <Header as="h5">Service</Header>
                                        </div>
                                        <div className="column">
                                            Hair
                                        </div>
                                    </div>
                                    <div className="four column centered row">
                                        <div className="column">
                                            <Header as="h5">Duration</Header>
                                        </div>
                                        <div className="column">
                                            1 Hour
                                        </div>

                                    </div>
                                    <div className="center aligned row">
                                        <div className="column"><Button positive fluid>Reschedule</Button></div>
                                        <div className="column"><Button negative fluid>Cancel</Button></div>
                                    </div>
                                </div>
                                
                                <Divider section />

                                <Header as="h4">
                                    <Icon name='calendar alternate outline'/>February 18th at 5:00PM - 5:30PM
                                </Header>
                                <div className="ui two column grid">
                                    <div className="four column centered row">
                                        <div className="column">
                                            <Header as="h5">Service</Header>
                                        </div>
                                        <div className="column">
                                            Colour
                                        </div>
                                    </div>
                                    <div className="four column centered row">
                                        <div className="column">
                                            <Header as="h5">Duration</Header>
                                        </div>
                                        <div className="column">
                                            30 Mins 
                                        </div>

                                    </div>
                                    <div className="center aligned row">
                                        <div className="column"><Button positive fluid>Reschedule</Button></div>
                                        <div className="column"><Button negative fluid>Cancel</Button></div>
                                    </div>
                                </div>
                                
                            </Segment>
                            

                        </div>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        </Container>



*/