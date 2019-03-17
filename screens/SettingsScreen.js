import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button, Title } from 'native-base';
export default class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>

        <Header>
          <Left>
            <Icon name='settings' type='Octicons' style={{color:'white'}}/>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>

        <Content>

          <ListItem icon onPress={() => {this.props.navigation.navigate('Login')}}>
            <Body>
              <Text style={{textAlign: 'center', color: 'red'}}>Log out</Text>
            </Body>
          </ListItem>

        </Content>
      </Container>
    );
  }
}
