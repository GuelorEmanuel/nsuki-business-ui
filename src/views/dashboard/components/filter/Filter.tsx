import { Input, Header, Container, Icon } from "semantic-ui-react";
import React from "react";

interface IProps {}

class Filter extends React.Component<IProps> {
    
    public render(): JSX.Element { 
        return <>
            <Input
                icon={{ name: 'search', circular: true, link: true }}
                placeholder='Filter client...'
                fluid
            />   
        </>
    }
}

export default Filter