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
import { Constants, MapView, Location, Permissions } from 'expo';

import { MonoText } from '../components/StyledText';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
  mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
  locationResult: null,
  location: {coords: { latitude: 37.78825, longitude: -122.4324}},
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
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 400 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
    />
        </MapView>

        <Text>
          Location: {this.state.locationResult}
        </Text>

      </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
