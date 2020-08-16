import React from 'react';
import { connect, DispatchProp } from 'react-redux';

import IStore from '../../../models/IStore';
import IAction from '../../../models/IAction';
import UserModel from '../../../stores/auth/models/users/UserModel';
import ResponsiveContainer from './components/ResponsiveContainer';
import Footer from './components/Footer'

type LanguageOptions = {
  key: string;
  text: string;
  value: string;
}

interface IProps {}
interface IState {
  languageOptions: Array<LanguageOptions>;
}
interface IStateToProps {
  readonly user: UserModel | null;
  readonly isLandingPage: boolean;
}

type Props = IProps & IStateToProps & DispatchProp<IAction<any>>

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  user: state.auth.user,
  isLandingPage: state.router.location.pathname === '/' ? true : false
});


// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.

export class MainNav extends React.PureComponent<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      languageOptions: [
        { key: 'Canada (English)', text: 'Canada (English)', value: 'Canada (English)' },
        { key: 'Canada (Français)', text: 'Canada (Français)', value: 'Canada (Français)' },
        { key: 'France', text: 'France', value: 'France' },
        { key: 'Portugal', text: 'Portugal', value: 'Portugal' },
        { key: 'Nederland', text: 'Nederland', value: 'Nederland' },
        { key: 'Netherlands (English)', text: 'Netherlands (English)', value: 'Netherlands (English)' },
      ]
    };
  }

  public render(): JSX.Element {
    const { children, isLandingPage, user } = this.props;

    return (
      <ResponsiveContainer isLandingPage={isLandingPage} user={user}>
        {children}
        {!user &&
         <Footer languageOptions={this.state.languageOptions } />
        }
      </ResponsiveContainer>
    );
  }
}

export default connect(mapStateToProps)(MainNav);
