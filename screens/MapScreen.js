import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, Dimensions,} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, Icon, Toast } from 'native-base';
import { Constants, MapView, Location, Permissions } from 'expo';
import { showLocation } from 'react-native-map-link'

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

constructor() {
  super();
  this.getParkingInfo = this.getParkingInfo.bind(this);
  this.refreshMap = this.refreshMap.bind(this);
  this.state = {
    locationResult: null,
    location: {coords: { latitude: 0, longitude: 0}},
    apiData: null,
    parkingInfo:[],
  }
}

componentDidMount() {
  this._getLocationAsync();
  this.getParkingInfo();
}

_handleMapRegionChange = mapRegion => {
  this.setState({ mapRegion });
};

_onMarkerPress = markerData => {
   console.log(markerData.nativeEvent.coordinate);
   showLocation({
    latitude: markerData.nativeEvent.coordinate.latitude,
    longitude: markerData.nativeEvent.coordinate.longitude,
  })
};

refreshMap() {
  this.getParkingInfo();
  this.forceUpdate();
}

_getLocationAsync = async () => {
 let { status } = await Permissions.askAsync(Permissions.LOCATION);
 if (status !== 'granted') {
   this.setState({
     locationResult: 'Permission to access location was denied',
     location,
   });
 }

 let location = await Location.getCurrentPositionAsync({});
 this.setState({ locationResult: JSON.stringify(location), location, });
};

async getParkingInfo() {
  let httpData = {
    method: 'GET',
    headers: {
      Authorization: global.accessToken,
      Accept: "application/json",
      "Content-type": "application/json; charset=UTF-8",
    },
  }

  try {
    let response = await fetch(global.serverUrl + 'api/user/parkingApi', httpData);
    let responseJson = await response.json();
    this.setState({apiData: responseJson});
    this.setState({loading:false});
    if (response.status == 200) {
      this.setState({parkingInfo: this.state.apiData.data});
    } else {
      Toast.show({
              text: this.state.apiData.message
            })
    }
  } catch (error) {
    console.error(error);
  }
}

  render() {

    mapMarkers = this.state.parkingInfo.map((item) => {
      //We need to return the corresponding mapping for each item too.
      return (
          // <View key={item.title} style={ styles.container }>
          //   <Text style={styles.title}>
          //     {item.title}
          //   </Text>
          // </View>

          <MapView.Marker
            key = {item.id}
            coordinate={item.coordinate}
            title={item.name}
            description={"Space left: "+item.space_left + "/" + item.space}
            onPress={this._onMarkerPress}
            />
        );
     });

    const { width, height } = Dimensions.get('window');
    const ratio = width / height;
    const delta = 0.0043;

    return (
      <Container>
      <Header>
        <Left>
          <Icon name='map' type='FontAwesome' style={{color:'white'}}/>
        </Left>
        <Body>
          <Title>Map</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.refreshMap}>
            <Icon name='refresh' type='MaterialCommunityIcons'/>
          </Button>
        </Right>
      </Header>

        <View style={styles.container}>
          <MapView
            provider='google'
            style={styles.map}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: delta,
              longitudeDelta: delta * ratio }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              loadingEnabled={true}>

              {mapMarkers}
          </MapView>
        </View>

      </Container>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
