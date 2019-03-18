import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, Icon, Toast, Spinner } from 'native-base';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.doRegister = this.doRegister.bind(this);
    this.state = {
      username:null,
      fname:null,
      lname:null,
      email:null,
      password:null,
      c_password:null,
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
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Register</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <Form>
            <Item floatingLabel style={styles.inputText}>
              <Label>Username</Label>
              <Input onChangeText={(username) => this.setState({username})}/>
            </Item>
            <Item floatingLabel style={styles.inputText}>
              <Label>First Name</Label>
              <Input onChangeText={(fname) => this.setState({fname})}/>
            </Item>
            <Item floatingLabel style={styles.inputText}>
              <Label>Last Name</Label>
              <Input onChangeText={(lname) => this.setState({lname})}/>
            </Item>
            <Item floatingLabel style={styles.inputText}>
              <Label>E-mail</Label>
              <Input onChangeText={(email) => this.setState({email})}/>
            </Item>
            <Item floatingLabel style={styles.inputText}>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
            </Item>
            <Item floatingLabel style={styles.inputText}>
              <Label>Confirm password</Label>
              <Input secureTextEntry={true} onChangeText={(c_password) => this.setState({c_password})}/>
            </Item>
          </Form>
          <Button block style={styles.registerButton} onPress={this.doRegister}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  async doRegister() {
    if(this.state.username == null || this.state.fname == null ||
      this.state.lname == null || this.state.email == null ||
      this.state.password == null || this.state.c_password == null) {
      Toast.show({
              text: 'Please fill in all the required fields'
            })
      return
    }
    else if (this.state.password != this.state.c_password) {
      Toast.show({
              text: 'Passwords do not match, please try again'
            })
      return
    }

    this.setState({loading:true})
    let httpData = {
      method: 'POST',
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name: this.state.username,
        first_name: this.state.fname,
        last_name: this.state.lname,
        email: this.state.email,
        password: this.state.password
      })
    }

    try {
      let response = await fetch(global.serverUrl + 'api/registerApi', httpData);
      let responseJson = await response.json();
      this.setState({apiData: responseJson});
      this.setState({loading:false});

      if (response.status == 200) {
        this.props.navigation.goBack()
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

const styles = StyleSheet.create({
  registerButton: {
    marginTop:20,
    margin: 10,
  },
  inputText: {
    margin: 10,
  },
});
