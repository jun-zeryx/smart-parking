import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, Card, CardItem, H3, Icon, Spinner, Toast } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.getUserInfo = this.getUserInfo.bind(this);
    this.state = {
      username:null,
      credit:null,
      apiData:null,
      loading:false,
    }
  }

  componentDidMount() {
    this.getUserInfo();
  }

  render() {

    if(this.state.loading == true) {
      return (
        <Container>
          <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
            <Spinner color='#60656d'/>
          </Content>
        </Container>
      );
    }

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
              <Text style={{color:'#3F51B5'}}>Welcome, {this.state.username}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Your balance is</Text>
                <Text style={{padding: '8%', alignSelf: 'center'}}>RM{this.state.credit}</Text>
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

  async getUserInfo() {
    this.setState({loading:true});

    let httpData = {
      method: 'GET',
      headers: {
        Authorization: global.accessToken,
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    }

    try {
      let response = await fetch(global.serverUrl + 'api/user/userInfoApi', httpData);
      let responseJson = await response.json();
      this.setState({apiData: responseJson});
      this.setState({loading:false});
      if (response.status == 200) {
        this.setState({username:this.state.apiData.data.username});
        this.setState({credit:this.state.apiData.data.userCredit})
      } else {
        Toast.show({
                text: this.state.apiData.message
              })
      }
    } catch (error) {
      console.error(error);
    }
  }
}
