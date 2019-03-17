import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, Card, CardItem, H3, Icon } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>

        <Header>
          <Left>
            <Icon name='home' type='FontAwesome' style={{color:'white'}}/>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card>
            <CardItem header bordered>
              <H3 style={{color:'#3F51B5'}}>Welcome username</H3>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Your balance is</Text>
                <Text style={{padding: '8%', alignSelf: 'center'}}>RM50.00</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Body>
                <Text style={{padding: '8%', alignSelf: 'center'}}>Some other info here, idk</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
