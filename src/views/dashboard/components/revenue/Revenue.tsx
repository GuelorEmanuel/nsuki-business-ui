import { Input, Header, Container, Icon} from "semantic-ui-react"
import React from "react";
import { IPeriodRevenue } from "../../Interface";


interface IProps {
    readonly periodRevenue: IPeriodRevenue;
}


class Revenue extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    
    public render(): JSX.Element { 
        const { month, amount } = this.props.periodRevenue;

        return <>
            <Header as='h2'> 
                <Icon name='money bill alternate outline' />
                <Header.Content>
                    { month } Revenue : { amount }
                </Header.Content>
            </Header>
        </>
    }
}

export default Revenue