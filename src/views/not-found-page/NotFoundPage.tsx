import styles from './NotFoundPage.module.scss';
import { Header, Segment, Grid, Container } from 'semantic-ui-react';
import React from 'react';

interface IProps {}
interface IState {}

export default class NotFoundPage extends React.PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return (
      <div className={styles.wrapper}>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid centered columns={2}>
            <Segment style={{ padding: '8em 0em' }} vertical>
              <Container text>
                <Header as='h3' style={{ fontSize: '2em' }} verticalAlign='middle'>
                 404
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  This page doesn't exist. <a href="http://localhost:3000/">Head back to the index.</a>
                </p>
              </Container>
            </Segment>
          </Grid>
        </Segment>
      </div>
    );
  }
}
