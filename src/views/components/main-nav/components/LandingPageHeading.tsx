import React from 'react';
import {
  Container
} from 'semantic-ui-react';

import LandingPagePanel from './LandingPagePanel';

type LandingPageHeadingProps = {
  mobile: boolean;
}

const LandingPageHeading: React.FC<LandingPageHeadingProps>  = ({ mobile }) => (
  <Container 
    style={{
      padding: '2em 0em' 
    }}
    text>
    <LandingPagePanel mobile />
    {/* <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button> */}
  </Container>
)

export default LandingPageHeading;