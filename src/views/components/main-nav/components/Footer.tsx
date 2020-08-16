import React from 'react';
import {
  Button,
  Grid,
  List,
  Dropdown,
  Segment,
  Container,
  Header,
  Divider
} from 'semantic-ui-react';

type LanguageOptions = {
  key: string;
  text: string;
  value: string;
}

type FooterProps = {
  languageOptions: Array<LanguageOptions>
}

const Footer: React.FC<FooterProps>= ({ languageOptions }) => (
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='PRODUCT' />
              <List link inverted>
                <List.Item as='a'>Features</List.Item>
                <List.Item as='a'>Pricing</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='COMPANY' />
              <List link inverted>
                <List.Item as='a'>About</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                SUPPORT
              </Header>
              <List link inverted>
                <List.Item as='a'>Support</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider inverted section />
          <div>
            <List inverted floated='right' horizontal>
              <List.Item href='#'>Terms of Service</List.Item>
              <List.Item href='#'>Privacy Policy</List.Item>
              <List.Item>
              <Dropdown
                defaultValue='Canada (English)'
                button
                className='icon'
                labeled
                icon='world'
                options={languageOptions}
                selection
              />
               </List.Item>
              
            </List>

            <List horizontal>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Button size='mini' circular  icon='facebook' />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Button size='mini' circular  icon='linkedin' />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Button size='mini' circular  icon='instagram' />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Button size='mini' circular  icon='twitter' />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </List>
          </div>
    </Container>
  </Segment>
)

export default Footer;