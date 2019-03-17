import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarText from '../components/TabBarText';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from '../screens/MapScreen';
import ScanScreen from '../screens/ScanScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused}>Home</TabBarText>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const ScanStack = createStackNavigator({
  Scan: ScanScreen,
});

ScanStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused}>Scan</TabBarText>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'}
    />
  ),
};

const MapStack = createStackNavigator({
  Map: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused}>Map</TabBarText>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused}>Settings</TabBarText>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ScanStack,
  MapStack,
  SettingsStack,
});
