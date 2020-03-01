import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import {Grid, Row} from 'native-base';

export default class BloodPressureModal extends Component {
  labels = [
    {
      name: 'Çok Tehlikeli',
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
    },
    {
      name: 'Tehlikeli',
      labelColor: '#ff5400',
      activeBarColor: '#ff5400',
    },
    {
      name: 'Çok Düşük',
      labelColor: '#f4ab44',
      activeBarColor: '#f4ab44',
    },
    {
      name: 'Düşük',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },
    {
      name: 'Normal',
      labelColor: '#14eb6e',
      activeBarColor: '#14eb6e',
    },
    {
      name: 'İdeal',
      labelColor: '#00ff6b',
      activeBarColor: '#00ff6b',
    },    
    {
      name: 'Düşük',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },
    {
      name: 'Çok Düşük',
      labelColor: '#f4ab44',
      activeBarColor: '#f4ab44',
    },
    {
      name: 'Tehlikeli',
      labelColor: '#ff5400',
      activeBarColor: '#ff5400',
    },
    {
      name: 'Çok Tehlikeli',
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
    },
  ];
  render() {
    return (
      <Grid>
        <Row>
          <RNSpeedometer size={200} labels={this.labels} maxValue={140} minValue ={90}/>
          <RNSpeedometer size={200} labels={this.labels} />
        </Row>
        <Row></Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({});
