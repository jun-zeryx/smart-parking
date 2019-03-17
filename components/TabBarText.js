import React from 'react';
import { Text } from 'react-native';
import Colors from '../constants/Colors';

export default class TabBarText extends React.Component {
  render() {
    return <Text {...this.props} style={{textAlign: 'center',
    fontSize: 10,
    color: this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}} />;
  }
}
