import { Header, Container, Button, Icon, Segment, List, Divider, Grid } from "semantic-ui-react"
import React, { Fragment } from "react";
import { IPlan, PlanType } from "../../Interface";
import styles from './Upgrade.module.scss';


interface IProps {
    readonly upgradePlan: IPlan;
    updateHandler(selectedPlanType: PlanType):void;
}

interface IState {
    currentSelection: string;
}

class Upgrade extends React.Component<IProps, IState> {
    
    constructor(props: IProps) { 
        super(props);

        this.state = {
            currentSelection: PlanType.Monthly
        };
    }

    /*
        Format date in Month Date, Year format
    */
    private formatDate(myDate: Date): string{
        var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return month[myDate.getMonth()]+" "+myDate.getDate()+", "+myDate.getFullYear();
    }
    
    /*
        Toggle PlanType selection
    */
    handlePlanTypeClick = () =>
        this.setState((prevState) => ({ currentSelection: (prevState.currentSelection === PlanType.Monthly) ? PlanType.Annual : PlanType.Monthly }))

    handleUpdateClick = () => {
        this.props.updateHandler(PlanType[this.state.currentSelection]);
    }

    public render(): JSX.Element { 
        const { upgradePlan } = this.props;
        var index = 0;
        
        return <>
        <Container> 
                <Header as="h2" textAlign='center'>Upgrading To</Header>
                <Header as="h3">{upgradePlan.name}</Header>
                <List>
                    { upgradePlan.featureList.map(function(featureName: string) {
                        return (  
                            <List.Item>
                                <Icon name='check' size='small'/>
                                <List.Content>
                                    <List.Header>{ featureName }</List.Header>
                                </List.Content>
                            </List.Item>
                        )
                    })}
                </List>
                <Divider></Divider>
                <Header as="h3">Summary</Header>
                <Button.Group size='small'>
                    {
                        Object.entries(upgradePlan.paymentOptionsAndFee).map(([key, _]) => {
                        index += 1;
                        if(Object.entries(upgradePlan.paymentOptionsAndFee).length > index) {
                            return (
                                <Fragment>
                                    <Button toggle active={this.state.currentSelection === key} onClick={this.handlePlanTypeClick}>{ key }</Button>
                                    <Button.Or />
                                </Fragment>
                            );
                        } else {
                            return (  
                                <Button toggle active={this.state.currentSelection === key} onClick={this.handlePlanTypeClick}> { key } </Button>
                            )    
                        }
                    })}
                </Button.Group>
                <div className={styles.top2EmPadding}></div>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header as="h4">New {this.state.currentSelection} total</Header>
                        </Grid.Column>
                        <Grid.Column>
                            ${ upgradePlan.paymentOptionsAndFee[this.state.currentSelection]}/{this.state.currentSelection }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Header as="h4">New Payment due date</Header>
                            </Grid.Column>
                            <Grid.Column>
                                { 
                                   this.formatDate(upgradePlan.nextDueDate[this.state.currentSelection]) 
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
                
                <Segment basic textAlign={"center"} className={styles.top2EmPadding}>
                    <Button positive onClick={ this.handleUpdateClick } attached='bottom'>Upgrade my account</Button>
                </Segment>
                        
                    
        </Container>
        </>
    }
}

export default Upgrade
