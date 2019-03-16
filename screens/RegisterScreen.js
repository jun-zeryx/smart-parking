import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, Icon } from 'native-base';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.doRegister = this.doRegister.bind(this);
    this.state = {
      username:null,
      password:null,
      apiData:null,
      loading:false,
     };
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Register</Title>
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

  doRegister() {
    alert('register')
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
