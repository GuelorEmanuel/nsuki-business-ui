import { Container, Grid } from "semantic-ui-react"
import CurrentPlan from "./components/currentplan/CurrentPlan"
import Upgrade from "./components/upgrade/Upgrade"
import { IPlan, PlanType } from "./Interface"
import styles from './Plan.module.scss';
import React from "react";

interface IProps {}
interface IState {}

const currentPlan:IPlan = {
    name: "Nsuki Basic",
    paymentOptionsAndFee: {[PlanType.Monthly]: 10.00,[PlanType.Annual]: 100.00},
    featureList: ["Booked with Google Calendar Sync","Regular and irregular time scheduling","Accept Deposit"],
    defaultPlanType: PlanType.Monthly,
    nextDueDate: {[PlanType.Monthly]: new Date('01-12-2021'),[PlanType.Annual]: new Date('05-13-2021')}
}

const selectedPaymentOption = PlanType.Monthly


const upgradePlan:IPlan = {
    name: "Nsuki Pro",
    paymentOptionsAndFee: {[PlanType.Monthly]: 15.00,[PlanType.Annual]: 120.00},
    featureList: ["In addition to features from Basic Plan...","Multiple calendar sync","Client reminders Email/SMS", "Client file with image gallery"],
    defaultPlanType: PlanType.Monthly,
    nextDueDate: {[PlanType.Monthly]: new Date('01-12-2021'),[PlanType.Annual]: new Date('05-13-2021')}
}

class PlanPage extends React.Component<IProps, IState> {
    
    constructor(props: IProps) { 
        super(props);
    }

    updateHandler = (selectedPlanType: PlanType) => {}

    public render(): JSX.Element { 
        
        return <>
        <Container className={styles.planContainer}>
            <Grid celled columns={4}>
                <Grid.Row>
                    <Grid.Column width='6' className={styles.currentPlanColumn}>
                        <CurrentPlan profilePhotoUri="https://i.pinimg.com/474x/db/0c/80/db0c80b6458ae43c315870f3412ddf15.jpg"
                                     currentPlan={currentPlan}
                                     username="Linda Ray"
                                     paymentOption={selectedPaymentOption}/>
                    </Grid.Column>
                    <Grid.Column width='10' className={styles.upgradePlanColumn}>
                        <Upgrade upgradePlan={upgradePlan} updateHandler={this.updateHandler}/>    
                    </Grid.Column>   
                </Grid.Row>
            </Grid>
        </Container>
        </>
    }
}

export default PlanPage
