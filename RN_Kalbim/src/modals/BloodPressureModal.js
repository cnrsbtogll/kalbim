import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button} from 'native-base';

import RNSpeedometer from 'react-native-speedometer';

import {Grid, Row, Col} from 'native-base';
import colors from '../styles/colors';

export default class BloodPressureModal extends Component {
  state = {
    diastolic: 50,
    systolic: 110,
  };
  labels = [
    // {
    //   name: 'Çok Tehlikeli',
    //   labelColor: '#ff2900',
    //   activeBarColor: '#ff2900',
    // },
    {
      //name: 'Tehlikeli',
      labelColor: '#ff5400',
      activeBarColor: '#ff5400',
    },
    // {
    //   name: 'Çok Düşük',
    //   labelColor: '#f4ab44',
    //   activeBarColor: '#f4ab44',
    // },
    {
      //name: 'Dikkat',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },
    // {
    //   name: 'Normal',
    //   labelColor: '#14eb6e',
    //   activeBarColor: '#14eb6e',
    // },
    {
      //name: 'Normal',
      labelColor: '#00ff6b',
      activeBarColor: '#00ff6b',
    },
    // {
    //   name: 'Normal',
    //   labelColor: '#14eb6e',
    //   activeBarColor: '#14eb6e',
    // },
    {
      //name: 'Dikkat',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },
    // {
    //   name: 'Çok Yüksek',
    //   labelColor: '#f4ab44',
    //   activeBarColor: '#f4ab44',
    // },
    {
      //name: 'Tehlikeli',
      labelColor: '#ff5400',
      activeBarColor: '#ff5400',
    },
    // {
    //   name: 'Çok Tehlikeli',
    //   labelColor: '#ff2900',
    //   activeBarColor: '#ff2900',
    // },
  ];
  render() {
    return (
      <Grid style={{backgroundColor:colors.background}}>
        <Row>
          <Col style={styles.col}>
            <Text style={styles.text}>Büyük Tansiyon</Text>
            <Text style={styles.text}>90 - 140</Text>
            <Text style={styles.text}>Küçük Tansiyon</Text>
            <Text style={styles.text}>60 - 90</Text>
          </Col>
          <Col></Col>
          <Col style={styles.col}>
            <Text style={styles.text}>Kalp Ritmi</Text>
            <Text style={styles.text}>80 BPM</Text>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.col}>
            <Text style={styles.text}>Büyük Tansiyon</Text>
            <RNSpeedometer
              size={200}
              labels={this.labels}
              value={this.state.systolic}
              maxValue={180}
              minValue={80}
              labelStyle={{color:colors.white}}
            />
          </Col>
          <Col style={styles.col}>
            <Text style={styles.text}>Küçük Tansiyon</Text>
            <RNSpeedometer
              size={200}
              labels={this.labels}
              value={this.state.diastolic}
              maxValue={140}
              //minValue={10}
              labelStyle={{color:colors.white}}
            />
          </Col>
        </Row>

        <Row style={styles.row}>
          <Button style={{backgroundColor:colors.tabbarcolor}}>
            <Text style={{color:colors.white}}>       Ölç       </Text>
          </Button>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:colors.white
  }
});
