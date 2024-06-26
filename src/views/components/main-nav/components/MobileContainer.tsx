import environment from "environment";
import React from "react";
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from "semantic-ui-react";

import LandingPageHeading from "./LandingPageHeading";
import IAuthState from "../../../../stores/auth/models/IAuthState";

interface IProps {
  isLandingPage?: boolean;
  auth: IAuthState;
}
interface IState {
  sidebarOpened: boolean;
}

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Number(Responsive.onlyTablet.minWidth) : window.innerWidth;
};

export default class MobileContainer extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      sidebarOpened: false
    };
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, isLandingPage, auth } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item
            as="a"
            style={{
              fontSize: "1.5em",
              fontWeight: "normal",
              marginTop: "1.5em"
            }}
          >
            Ns&uacute;ki
          </Menu.Item>
          {!auth.nbs_refresh_token && <Menu.Item as="a">Log in</Menu.Item>}
          {!auth.nbs_refresh_token && (
            <Menu.Item as="a">Start free trial</Menu.Item>
          )}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  {!auth.nbs_refresh_token && (
                    <Button
                      href={environment.api.callBack}
                      as="a"
                      primary
                      style={{ marginLeft: "0.5em" }}
                    >
                      Log in
                    </Button>
                  )}
                  {!auth.nbs_refresh_token && (
                    <Button
                      href={environment.api.callBack}
                      as="a"
                      primary
                      style={{ marginLeft: "0.5em" }}
                    >
                      Start free trial
                    </Button>
                  )}
                </Menu.Item>
              </Menu>
            </Container>
            {isLandingPage && !auth.nbs_refresh_token && (
              <LandingPageHeading mobile={true} />
            )}
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}
