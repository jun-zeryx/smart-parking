import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, } from 'native-base';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Text>{global.serverUrl}</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
