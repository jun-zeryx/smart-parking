import React, { Component } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Spinner, Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, Toast, Icon } from 'native-base';
import { createStackNavigator,createAppContainer } from 'react-navigation';

import RegisterScreen from './RegisterScreen';

class LoginScreen extends Component {
  constructor() {
    super();
    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.state = {
      username:null,
      password:null,
      apiData:null,
      loading:false,
     };
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
          <Icon name='login' type='MaterialCommunityIcons' style={{color:'white'}}/>
        </Left>
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>

        <Content>
          <Form>
            <Item floatingLabel style={styles.inputText}>
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({username})}/>
            </Item>
            <Item floatingLabel style={styles.inputText}>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
            </Item>
          </Form>
          <Button block style={styles.loginButton} onPress={this.doLogin}>
            <Text>Login</Text>
          </Button>
          <Button block light style={styles.registerButton} onPress={this.doRegister}>
            <Text>Register</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  async doLogin() {

    if(this.state.username == null) {
      Toast.show({
              text: 'Please enter your username'
            })
      return
    }
    else if (this.state.password == null) {
      Toast.show({
              text: 'Please enter your password'
            })
      return
    }

    this.setState({loading:true});
    let httpData = {
      method: 'POST',
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        grant_type: 'password',
        client_id: 2,
        client_secret: 'rRQeAuqnsH3EV1lyiRvycCnVXO45egOgnMCQbO1s',
        provider: 'users'
      })
    }

    try {
      let response = await fetch(global.serverUrl + 'oauth/token', httpData);
      let responseJson = await response.json();
      this.setState({apiData: responseJson});
      this.setState({loading:false});
      if (response.status == 200) {
        global.accessToken = this.state.apiData.token_type + " " +this.state.apiData.access_token
        this.props.navigation.navigate('Main')
      } else {
        Toast.show({
                text: this.state.apiData.message
              })
      }
    } catch (error) {
      console.error(error);
    }
  }

  doRegister() {
    this.props.navigation.navigate('Register');
  }

}

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 20,
    margin: 10,
  },
  registerButton: {
    margin: 10,
  },
  inputText: {
    margin: 10,
  },
});

const loginStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

export default createAppContainer(loginStack)
