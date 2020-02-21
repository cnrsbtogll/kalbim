import React, {Component} from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import HomeTabRouter from '../../containers/HomeTabRouter';
import colors from '../../styles/colors';
import {View} from 'native-base';

export default class index extends Component {
 
  render() {
    Keyboard.dismiss();
    return (
      <View style={styles.wrapper}>
        <HomeTabRouter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.containercolor,
  },
});
