import { Card, Button } from "semantic-ui-react";
import  React from "react";
import { Link } from 'react-router-dom';
import { ITodo } from "../../Interface";

interface IProps {
    readonly todoList: ITodo[];
    readonly todoLink: string;
}

class Todo extends React.Component<IProps> {
    
    public render(): JSX.Element { 
        
        return <>
            <Card.Group>
                 {
                    this.props.todoList.map((todo, _) => {
                        return <>
                            <Card raised>
                                <Card.Content>
                                    <Card.Header>{ todo.title }</Card.Header>
                                    <Card.Description>
                                        { todo.description }
                                    </Card.Description>
                                    
                                </Card.Content>
                                <Card.Content extra style={{ backgroundColor: 'white', border: 'none' }}>
                                <div className='ui bottom button' style={{ backgroundColor: 'white', width: '100%'}}>
                                    <Link to={this.props.todoLink}>
                                        <Button color='yellow' style={{ width: '100%'}}>
                                            Start
                                        </Button>
                                    </Link>
                                    
                                </div>
                                </Card.Content>
                            </Card> 
                        </>   
                    })
                 }
            </Card.Group>    
        
            
        </>
    }
}

export default Todo

