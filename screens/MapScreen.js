import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, Dimensions,} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Left, Right, Body, Title, Icon } from 'native-base';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
  locationResult: null,
  location: {coords: { latitude: 0, longitude: 0}},
};

componentDidMount() {
  this._getLocationAsync();
}

_handleMapRegionChange = mapRegion => {
  this.setState({ mapRegion });
};

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

  render() {
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
        <Right />
      </Header>

        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: delta,
              longitudeDelta: delta * ratio }}>

            <MapView.Marker
              coordinate={this.state.location.coords}
              title="My Marker"
              description="Some description"
              />
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
