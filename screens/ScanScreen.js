import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { Container, Header, Left, Right, Body, Icon, Text, Title, Content, Button, Toast } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScanScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      showCamera:false,
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }

  render() {

    const { width } = Dimensions.get('window')
    const qrSize = width * 1

    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    if (this.state.showCamera == true) {
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
              style={StyleSheet.absoluteFill}>
              <Image
              style={{marginTop:'25%',alignSelf:'center',width:qrSize,height:qrSize}}
              source={require('../assets/images/qr_overlay.png')}
              />
            </BarCodeScanner>
          </View>
        </Container>
      );
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

        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
          <Button style={{alignSelf:'center'}} onPress={() => this.setState({showCamera:true})}>
            <Text>Scan</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  //NOTE:- Unable to setState for JSON data
  handleBarCodeScanned = async ({ type, data }) => {
    if (type == 'org.iso.QRCode') {
      this.setState({showCamera:false})
      try {
        var obj = JSON.parse(data);
        let httpData = {
          method: 'POST',
          headers: {
            Authorization: global.accessToken,
            Accept: "application/json",
            "Content-type": "application/json; charset=UTF-8",
          },
          body: data
        }

        let response = await fetch(global.serverUrl + 'api/user/scanApi', httpData);
        let responseJson = await response.json();
        this.setState({apiData: responseJson});
        console.log(this.state.apiData)
        this.setState({loading:false});
        if (response.status == 200) {
          this.setState({parkingInfo: this.state.apiData.data});
          Toast.show({
            text: this.state.apiData.message
          })
        } else {
          Toast.show({
                  text: this.state.apiData.message
                })
        }

      } catch (error) {
        console.log(error);
        Toast.show({
          text: 'Invalid QR Code'
        })
      }
    }
  }
}
