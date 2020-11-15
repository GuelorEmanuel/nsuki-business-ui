import { Header, Container, Image, Button, Icon } from "semantic-ui-react"
import React from "react";



interface IProps {
    readonly photoUriList: Array<string>;
    readonly customerEmail: string;
    readonly customerPhoneNumber: string;
    readonly customerName: string;
}

interface IState {}



class Profile extends React.Component<IProps, IState> {
    
    constructor(props: IProps) { 
        super(props);
    }

    public render(): JSX.Element { 
        const {photoUriList, customerEmail, customerPhoneNumber, customerName } = this.props;
        
        return <>
        <Container>
            <Header as="h2">{customerName}</Header>
            <div style={{overflowX: 'auto', whiteSpace: 'nowrap'}}> 
                <Image.Group size='tiny' bordered>
                    { photoUriList.map(photoUri => (
                        <Image src={photoUri} />
                        ))
                    }
                </Image.Group>
            </div>
            <div style={{marginTop: '1em'}}> 
                <Button icon labelPosition='left'>
                    <Icon name='add circle'/> Add Image
                </Button>
                <Header as="h3">Email</Header>
                <span>{customerEmail}</span>
                <Header as="h3">Phone Number</Header>
                <span>{customerPhoneNumber}</span>
            </div>
            <div className="ui four column grid" style={{marginTop: '1em'}}>
                <div className="three column centered row">
                    <div className="column">
                        <Button positive fluid>Edit</Button>
                    </div>
                    <div className="column">
                        <Button negative fluid>Delete</Button>
                    </div>
                </div>
            </div>
        </Container>
        </>
    }
}

export default Profile
