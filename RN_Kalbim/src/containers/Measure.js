import React, {Component} from 'react';
import {StyleSheet,Keyboard, Image} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import MyBoxButton from '../components/MyBoxButton';
import colors from '../styles/colors';
import LineChart from '../components/LineChart';
import {observer, inject} from 'mobx-react';
import {Container} from 'native-base';

export default class Measure extends Component {
  constructor(props){
    super(props);
  }
  render() {
    Keyboard.dismiss();
    return (
      <Container>
        <Row size={1} style={styles.boxes}>
          <MyBoxButton
            text="EKG & Solunum Ritmi"
            text2=""
            icon={
              <LineChart></LineChart>
            }
            backgroundColor={colors.background}
            handleOnPress={() => {              
              this.props.navigation.navigate('MeasureModal');
            }}></MyBoxButton>
        </Row>
        <Row size={1} style={styles.boxes}>
          <Col style={styles.boxes}>
            <MyBoxButton
              text="Tansiyon"
              text2="mmHg"
              icon={
                <Image
                  source={require('../img/blood-pressure.png')}
                  style={styles.logo2}
                />
              }
              backgroundColor={colors.background}
              handleOnPress={() => {
                this.props.navigation.navigate('MeasureModal');
              }}
            />
          </Col>
          <Col style={styles.boxes}>
            <MyBoxButton
              text="Ateş"
              text2="°C"
              icon={
                <Image
                  source={require('../img/thermometer.png')}
                  style={styles.logo2}
                />
              }
              backgroundColor={colors.background}
              handleOnPress={() => {
                this.props.navigation.navigate('MeasureModal');
              }}
            />
          </Col>
        </Row>
        <Row size={1} style={styles.boxes}>
          <Col style={styles.boxes}>
            <MyBoxButton
              text="Kalp Ritmi"
              text2="BMP"
              icon={
                <Image
                  source={require('../img/heart_rate.png')}
                  style={styles.logo2}
                />
              }
              backgroundColor={colors.background}
              handleOnPress={() => {
                this.props.navigation.navigate('MeasureModal');
              }}
            />
          </Col>
          <Col style={styles.boxes}>
            <MyBoxButton
              text="SpO₂"
              text2="O₂%"
              icon={
                <Image
                  source={require('../img/drop.png')}
                  style={styles.logo2}
                />
              }
              backgroundColor={colors.background}
              handleOnPress={() => {
                this.props.navigation.navigate('MeasureModal');
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  boxes: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.containercolor,
  },
  logo: {
    width: '95%',
    height: '95%',
    resizeMode: 'center',
  },
  logo2: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
