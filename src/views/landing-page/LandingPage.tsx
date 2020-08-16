import React from 'react';
import { connect } from 'react-redux';
import environment from 'environment';
import styles from './LandingPage.module.scss';
import IStore from '../../models/IStore';
import ShowsAction from '../../stores/shows/ShowsAction';
import { Header, Segment, Grid, Container, Button, Image } from 'semantic-ui-react';
import { ReduxProps } from '../../models/ReduxProps';
import LoadingIndicator from '../components/loading-indicator/LoadingIndicator';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';

interface IProps {}
interface IState {}
interface IRouteParams {}
interface IStateToProps {
  readonly isRequesting: boolean;
}

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  isRequesting: selectRequesting(state, [ShowsAction.REQUEST_SHOW, ShowsAction.REQUEST_CAST]),
});

const MainOverview = () => (
  <div>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              With you wherever you’re going
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              One platform with all the business tools you need to start, run, and grow your beauty, hairstyling, and, barbershop business.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Find the information you need faster
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              With everything in one place, you’ll never have to keep information about your clients across multiple apps again
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src={process.env.PUBLIC_URL + '/images/g-g-barbershop-1.jpg'} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: '0em' }} vertical>
      <Grid verticalAlign='middle' columns={3} centered>
        <Grid.Row>
          <Grid.Column>
            <Image bordered rounded size='large' src={process.env.PUBLIC_URL + '/images/schedule.png'} />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Set your schedule
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Whether you work full-time or you juggle other things in life, we'll work with it. Your clients will book only when you’re free.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid verticalAlign='middle' columns={3} centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Send information and forms
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              We’ll send out post-care, pre-care, waivers, or any details on your behalf. Just let us know when and it’ll be done.
            </p>
          </Grid.Column>
          <Grid.Column>
            <Image bordered rounded size='large' src={process.env.PUBLIC_URL + '/images/forms.png'} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid verticalAlign='middle' columns={3} centered>
        <Grid.Row>
          <Grid.Column>
            <Image bordered rounded size='large' src={process.env.PUBLIC_URL + '/images/network.jpg'} />
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Promote your services
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Overwhelmed hiring a web developer? No worries, we’ll give you a free website so you can promote yourself.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid centered columns={2}>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }} >
              Start your business journey with Ns&uacute;ki 
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Try Ns&uacute;ki for free, and explore all the tools and services you need to start, run, and grow your business.
            </p>
            <Button href={environment.api.callBack} primary as='a' size='large'>
              Start free trial
            </Button>
          </Container>
        </Segment>
      </Grid>
    </Segment>
  </div>
)

class LandingPage extends React.Component<IProps & IStateToProps & ReduxProps<any, IRouteParams>, IState> {
  public render(): JSX.Element {
    const { isRequesting } = this.props;

    return (
      <div className={styles.wrapper}>
        <LoadingIndicator isActive={isRequesting}>
            <MainOverview />
        </LoadingIndicator>
      </div>
    );
  }
}

export { LandingPage as Unconnected };
export default connect(mapStateToProps)(LandingPage);
