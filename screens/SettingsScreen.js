import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, } from 'native-base';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Text>Hello</Text>
        </Content>
      </Container>
    );
  }
}
