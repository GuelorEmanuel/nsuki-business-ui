import React from "react";

import DesktopContainer from "./DesktopContainer";
import MobileContainer from "./MobileContainer";
import IAuthState from "../../../../stores/auth/models/IAuthState";

type ResponsiveContainerProps = {
  isLandingPage: boolean;
  auth: IAuthState;
  logout: () => void;
};

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  isLandingPage,
  auth,
  logout
}) => (
  <div>
    <DesktopContainer isLandingPage={isLandingPage} auth={auth} logout={logout}>
      {children}
    </DesktopContainer>
    <MobileContainer isLandingPage={isLandingPage} auth={auth}>
      {children}
    </MobileContainer>
  </div>
);

export default ResponsiveContainer;
