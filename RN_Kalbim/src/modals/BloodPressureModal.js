import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import RNSpeedometer from 'react-native-speedometer'


export default class BloodPressureModal extends Component {
  render() {
    return (
      <View>
        <RNSpeedometer></RNSpeedometer>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
