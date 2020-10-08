import React from "react";
import { connect } from "react-redux";
import { Persistor } from "redux-persist/es/types";
import AuthAction from "../../../stores/auth/AuthAction";
import { ReduxProps } from "../../../models/ReduxProps";
import IStore from "../../../models/IStore";
import IAuthState from "../../../stores/auth/models/IAuthState";
import ResponsiveContainer from "./components/ResponsiveContainer";
import Footer from "./components/Footer";

type LanguageOptions = {
  key: string;
  text: string;
  value: string;
};

interface IProps {
  readonly persistor: Persistor;
  readonly children: any;
}
interface IState {
  languageOptions: Array<LanguageOptions>;
}
interface IStateToProps {
  readonly auth: IAuthState;
  readonly isLandingPage: boolean;
}

type Props = IProps & IStateToProps & ReduxProps<any>;

const mapStateToProps = (state: IStore, ownProps: IProps): IStateToProps => ({
  auth: state.auth,
  isLandingPage: state.router.location.pathname === "/" ? true : false
});

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.

export class MainNav extends React.PureComponent<Props, IState> {
  logout = () => {
    const thisRef = this;
    this.props.persistor
      .purge()
      .then(function(response) {
        thisRef.props.dispatch(AuthAction.resetAuth());
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      languageOptions: [
        {
          key: "Canada (English)",
          text: "Canada (English)",
          value: "Canada (English)"
        },
        {
          key: "Canada (Français)",
          text: "Canada (Français)",
          value: "Canada (Français)"
        },
        { key: "France", text: "France", value: "France" },
        { key: "Portugal", text: "Portugal", value: "Portugal" },
        { key: "Nederland", text: "Nederland", value: "Nederland" },
        {
          key: "Netherlands (English)",
          text: "Netherlands (English)",
          value: "Netherlands (English)"
        }
      ]
    };
  }

  public render(): JSX.Element {
    const { children, isLandingPage, auth } = this.props;

    return (
      <ResponsiveContainer
        isLandingPage={isLandingPage}
        auth={auth}
        logout={this.logout}
      >
        {children}
        {!auth.nbs_refresh_token && (
          <Footer languageOptions={this.state.languageOptions} />
        )}
      </ResponsiveContainer>
    );
  }
}

export { MainNav as Unconnected };
export default connect(mapStateToProps)(MainNav);
