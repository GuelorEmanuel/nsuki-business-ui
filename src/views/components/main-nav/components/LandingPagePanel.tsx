import React from 'react';
import {
  Container,
  Header,
  Image,
} from 'semantic-ui-react';

type LandingPagePanelProps = {
  mobile: boolean;
}

const LandingPagePanel: React.FC<LandingPagePanelProps> = ({ mobile }) => (
  <div 
    style={{
      position: 'relative',
      margin: '20px'
  }}
  >
    <div 
      style={{
        position: 'absolute',
        width: '600px',
        height: '503px',
        top: 0,
        right: 208,
        background: '#E0E0E0',
        margin: 'auto',
        zIndex: 1
      }}
    >
      <Container 
        textAlign='center'
        style={{
          padding: '5em 5em 10em',
        }}
      >
        <div 
          style={{
            padding: '5em 0em',
            border: '1px solid black'
            }}
        >
          <Header 
            as='h2'
            style={{ 
              lineHeight: '1.2222222222',
              fontWeight: '800',
              fontFamily: 'Helvetica, Arial, sans-serif',
              letterSpacing: '-0.025em'
            }}
          >
            The  Ns&uacute;ki Difference
          </Header>
          <Header 
            as='h2' 
            style={{ 
              fontSize: '2.25em',
              lineHeight: '1.2222222222',
              fontWeight: '800',
              fontFamily: 'Helvetica, Arial, sans-serif',
              letterSpacing: '-0.025em'
            }}>
            THIS ONE'S<br />
            FOR YOU.
          </Header>
          <p
            style={{ 
              lineHeight: '1.2222222222',
              fontFamily: 'Helvetica, Arial, sans-serif',
              letterSpacing: '-0.025em',
              fontSize: '1.25em'
            }} 
          >
            Client notes and image galleries,<br />
            scheduling, deposits, we got you
          </p>
        </div>
      </Container>

    </div>
    <div>
      <Image
        bordered
        style={{
          width: '550px',
          height: '510px',
          position: 'absolute',
          top: 5,
          left: 300,
          margin: '20px'
        }
        }src={process.env.PUBLIC_URL + '/images/happy.jpeg'} size='large'
      />
    </div>

  </div>
);

export default LandingPagePanel;