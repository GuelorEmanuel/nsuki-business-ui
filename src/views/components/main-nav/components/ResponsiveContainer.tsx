import React from 'react';

import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';
import UserModel from '../../../../stores/auth/models/users/UserModel';


type ResponsiveContainerProps = {
  isLandingPage: boolean;
  user: UserModel | null;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, isLandingPage, user }) => (
  <div>
    <DesktopContainer isLandingPage={isLandingPage} user={user}>{children}</DesktopContainer>
    <MobileContainer isLandingPage={isLandingPage} user={user}>{children}</MobileContainer>
  </div>
)

export default ResponsiveContainer;