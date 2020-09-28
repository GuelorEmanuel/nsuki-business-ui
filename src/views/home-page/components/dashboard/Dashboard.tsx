import { Header, Container, Icon} from "semantic-ui-react"
import Revenue from "./components/revenue/Revenue"
import Filter from "./components/filter/Filter"
import styles from './Dashboard.module.scss';
import Appointment from "./components/appointment/Appointment"
import Todo from "./components/todo/Todo"
import React from "react";


interface IProps {}
interface IState {}


const testAppointmentData = [
    {
        appointmentType: 'Hair',
        clientName: 'Elliot Spencer',
        dateTime: new Date(),
        imageLink: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
    },
    {
        appointmentType: 'Hair Treatment',
        clientName: 'Jenny Macarthy',
        dateTime: new Date(),
        imageLink: 'https://react.semantic-ui.com/images/avatar/large/molly.png'
    },
    {
        appointmentType: 'Colouring',
        clientName: 'Dennis Brute',
        dateTime: new Date(),
        imageLink: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg'
    },
    {
        appointmentType: 'Kid\'s Hair Cut',
        clientName: 'Jessy',
        dateTime: new Date(),
        imageLink: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
    }
];

const testAppointmentData2 = [
    {
        appointmentType: 'Hair',
        clientName: 'Denny Lewis',
        dateTime: new Date(),
        imageLink: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/0a76afaa91be462b800aabb2011f8888_9366/Face_Covers_M_L_3_Pack_Black_H08837_21_model.jpg'
    },
    {
        appointmentType: 'Blow Style',
        clientName: 'Jenny Macarthy',
        dateTime: new Date(),
        imageLink: 'https://static.contrado.com/resources/images/2020-5/147937/custom-face-mask-893099_l.jpg'
    },
    {
        appointmentType: 'Bridal up-styles',
        clientName: 'Jacky',
        dateTime: new Date(),
        imageLink: 'https://www.byrdie.com/thmb/pr2U7ghfvv3Sz8zJCHWFLT2K55E=/735x0/cdn.cliqueinc.com__cache__posts__274058__face-masks-for-pores-274058-1543791152268-main.700x0c-270964ab60624c5ca853057c0c151091-d3174bb99f944fc492f874393002bab7.jpg'
    },
    {
        appointmentType: 'Regular blow-out',
        clientName: 'John',
        dateTime: new Date(),
        imageLink: 'https://static01.nyt.com/images/2020/04/10/video/HowToMakeAMask_Cover_1/HowToMakeAMask_Cover_1-square640.jpg'
    },
    {
        appointmentType: 'Hair',
        clientName: 'Billy',
        dateTime: new Date(),
        imageLink: 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/images/methode/2020/01/27/2d44075e-40ac-11ea-9fd9-ecfbb38a9743_image_hires_112302.jpg?itok=66xU--9r&v=1580095394'
    }
];

const todoList = [
    {
        title: "Setup Payment",
        description: "Please setup payment to receive payment"
    },
    {
        title: "Provide phone number",
        description: "Please provide phonenumber"
    },
    {
        title: "Add a service",
        description: "Please add at least one service"
    },
    {
        title: "Add business address",
        description: "Please provide your business address"
    },
    {
        title: "Setup time zone",
        description: "Please setup timezone of your location"
    }
];

// test data
var curretDate = new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'});
var currentMonth = curretDate.split(" ", 2)[0];
var amount = 100.00
var formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD', //must come from env
  });


class Dashboard extends React.Component<IProps, IState> {
    
    constructor(props: IProps) { 
        super(props);
    }

    public render(): JSX.Element { 
        const revenueProp = {amount: formatter.format(amount), month: currentMonth }
        return <>
        <Container className={styles.dashboardContainer}>
            <div className="centered ui grid">
                <div className="row">
                    <div className="six wide column" >
                        <Revenue periodRevenue={revenueProp}/>
                    </div>
                    <div className="right floated eight wide column" >
                        <Filter />
                    </div>
                </div>
            </div>
            <div className={"centered ui grid " + styles.scrollview}>
                <div className="row">
                    <div className="centered sixteen wide column">
                        <Header as='h3'>
                            <Icon name='clock outline' />
                            Today - {testAppointmentData.length} appointments in total
                        </Header>
                        <Appointment appointmentList={testAppointmentData}/>
                    </div>
                </div>
                <div className="row">
                    <div className="centered sixteen wide column">
                        <Header as='h3'>
                            <Icon name='calendar alternate outline' />
                            Tomorrow - {testAppointmentData2.length} appointments in total
                        </Header>
                        <Appointment appointmentList={testAppointmentData2}/>
                    </div>
                </div>
                <div className="row">
                    <div className="centered sixteen wide column">
                        <Header as='h3'>
                            <Icon name='tasks' />
                            Todos - {testAppointmentData2.length} in total
                        </Header>
                        <Todo todoList={todoList} todoLink="/"/>
                    </div>
                </div>
                <div className="row"></div>
                
            </div>
        </Container>
        </>
    }
}

export default Dashboard
