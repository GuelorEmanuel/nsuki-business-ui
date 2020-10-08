import environment from "environment";
import React from "react";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Dropdown,
  Icon,
  MenuItemProps,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import LandingPageHeading from "./LandingPageHeading";
import MenuNavLink from "./MenuNavLink";
import RouteEnum from "../../../../constants/RouteEnum";
import IAuthState from "../../../../stores/auth/models/IAuthState";

interface IProps {
  isLandingPage: boolean;
  auth: IAuthState;
  logout: () => void;
}
interface IState {
  fixed?: boolean;
  activeItem: string | undefined;
}

const bannerStyles = {
  minHeight: 700,
  padding: "0em 0em"
};

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Number(Responsive.onlyTablet.minWidth) : window.innerWidth;
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
export default class DesktopContainer extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      fixed: false,
      activeItem: "home"
    };
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: MenuItemProps
  ) => this.setState({ activeItem: data.name });

  render() {
    const { children, isLandingPage, auth, logout } = this.props;
    const { fixed, activeItem } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          {auth.nbs_refresh_token && (
            <div
              style={{
                float: "left",
                margin: "0em 3em 1em 0em",
                position: "fixed",
                top: "80px",
                zIndex: 10
              }}
            >
              <Menu
                size="large"
                icon="labeled"
                style={{
                  position: "relative",
                  left: "10px",
                  transition: "left 0.5s ease"
                }}
                vertical
              >
                <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="home" />
                  Home
                </Menu.Item>
                <Menu.Item
                  name="clients"
                  active={activeItem === "clients"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="users" />
                  Clients
                </Menu.Item>
                <Menu.Item
                  name="services"
                  active={activeItem === "services"}
                  onClick={this.handleItemClick}
                >
                  Services
                  <Icon name="cut" />
                </Menu.Item>
                <Menu.Item
                  active={activeItem === "settings"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="settings" />
                  Settings
                </Menu.Item>
              </Menu>
            </div>
          )}
          <Segment
            textAlign="center"
            style={isLandingPage ? bannerStyles : { padding: "0em 0em" }}
            vertical
          >
            <Menu
              fixed={auth.nbs_refresh_token || fixed ? "top" : undefined}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
              style={{
                background: "#E0E0E0"
              }}
            >
              <Container>
                <Menu.Item
                  as={MenuNavLink}
                  to={
                    !auth.nbs_refresh_token
                      ? RouteEnum.LandingPage
                      : RouteEnum.Admin
                  }
                  name="Home"
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "800"
                  }}
                >
                  Ns&uacute;ki
                </Menu.Item>
                <Menu.Item position="right">
                  {!auth.nbs_refresh_token && (
                    <Menu.Item
                      as={MenuNavLink}
                      to={RouteEnum.Episodes}
                      name="Pricing"
                    />
                  )}
                  {!auth.nbs_refresh_token && (
                    <Menu.Item
                      as={MenuNavLink}
                      to={RouteEnum.Home}
                      name="Resources"
                    />
                  )}
                  {!auth.nbs_refresh_token && (
                    <Menu.Item href={environment.api.callBack} as="a">
                      Log in
                    </Menu.Item>
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

                  {auth.nbs_refresh_token && (
                    <Dropdown
                      trigger={
                        <span>
                          <Image avatar src={auth.user?.image} />{" "}
                          {auth.user?.first_name} {auth.user?.last_name}
                        </span>
                      }
                      className="link item"
                    >
                      <Dropdown.Menu style={{ marginTop: "1.5em" }}>
                        <Dropdown.Item>
                          <Icon name="user outline"></Icon>
                          <Link to="/admin/account">Your account</Link>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout}>
                          <Icon name="sign out alternate"></Icon>Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
            {isLandingPage && !auth.nbs_refresh_token && (
              <LandingPageHeading mobile={false} />
            )}
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}
