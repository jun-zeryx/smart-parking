import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Left, Right, Body, Icon, Text, Title } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScanScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (

      <Container>
      <Header>
        <Left>
          <Icon name='qrcode-scan' type='MaterialCommunityIcons' style={{color:'white'}}/>
        </Left>
        <Body>
          <Title>Scan</Title>
        </Body>
        <Right />
      </Header>

      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>

      </Container>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }
}
