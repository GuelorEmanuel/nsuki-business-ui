import { Header, Container, Image, Icon, Grid, List, Button } from "semantic-ui-react"
import React from "react";
import { IPlan } from "../../Interface"
import styles from './CurrentPlan.module.scss';

interface IProps {
    readonly profilePhotoUri: string;
    readonly currentPlan: IPlan;
    readonly username: string;
    readonly paymentOption: string;
}

interface IState {}

class CurrentPlan extends React.Component<IProps, IState> {
    
    constructor(props: IProps) { 
        super(props);
    }

    private formatDate(myDate: Date): string{
        var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return month[myDate.getMonth()]+" "+myDate.getDate()+", "+myDate.getFullYear();
    }

    public render(): JSX.Element { 
        const {profilePhotoUri, currentPlan, username, paymentOption } = this.props;
        
        return <>
        <Container> 
            <Header as="h2" textAlign='center'>Current Plan</Header>
            <Grid columns='equal'> 
                <Grid.Column>
                    <Image src={profilePhotoUri} size='small' fluid />
                </Grid.Column>
                <Grid.Column verticalAlign='middle' width={9}>
                    <Header as="h3"> {username} </Header>
                    ${currentPlan.paymentOptionsAndFee[paymentOption]} {' '}
                    {paymentOption}
                </Grid.Column>
            </Grid>
            
            <div className={styles.currentPlanFeature}>
                <Header as="h3"> { currentPlan.name }</Header>
                <List>
                    { currentPlan.featureList.map(function(featureName: string) {
                        return (  
                            <List.Item>
                                <Icon name='check' color='green'/>
                                <List.Content>
                                    <List.Header>{featureName}</List.Header>
                                </List.Content>
                            </List.Item>
                        )
                    })}
                </List>
            </div>
            
            <Header as="h4">Next payment due date</Header>
            
            <div>
                { this.formatDate(currentPlan.nextDueDate[paymentOption]) }
            </div>
            
            <Container className={styles.backButtonTopSpacing}>
                <Button icon labelPosition='left' >
                    <Icon name='angle left' /> Back
                </Button>
            </Container>
                    
        </Container>
        </>
    }
}

export default CurrentPlan
