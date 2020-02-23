import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Title,
  Body,
  Button,
  Right,
  Left,
  Text
} from 'native-base';
import {Avatar} from 'react-native-elements';
import {Col, Row, Grid} from 'react-native-easy-grid';
import ImagePicker from 'react-native-image-picker';
import MyBoxButton from '../components/MyBoxButton';
import colors from '../styles/colors';

export default class Emergency extends Component {
  render() {
    return (
      <Container style={{backgroundColor: colors.containercolor}}>
        <Header transparent>
          <Left style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button transparent>
              <Avatar
                size="medium"
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                onPress={() => alert('avatar çalışıyor!')}
                //containerStyle={{margin: 2}}
                showEditButton
              />
            </Button>
            <Text style={{color: colors.white}}>Misafir</Text>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button
              style={{backgroundColor: colors.boxcolor}}
              onPress={() => alert('Bağlandı')}>
              <Text style={{color: colors.white}}>Cihaza Bağlan</Text>
            </Button>
          </Right>
        </Header>
        <Grid>
          <Row size={1} style={styles.boxes}>
          <MyBoxButton
              text="EKG & Solunum Ritmi"
              text2=""
              icon={
                <Image
                  source={require('../img/pulse22.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              }
              backgroundColor={colors.background}
            />         
          </Row>
          <Row size={1} style={styles.boxes}>
            <Col style={styles.boxes}>
            <MyBoxButton
              text="Kan Basıncı"
              text2="mmHg"
              icon={
                <Image
                  source={require('../img/blood-pressure.png')}
                  style={styles.logo2}
                />
              }
              backgroundColor={colors.background}
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
            />
            </Col>
          </Row>
          <Row size={1} style={styles.boxes}>
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
            />
            </Col>
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
            />
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  boxes: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.containercolor,
  },
  logo: {    
    width: '95%',
    height: '95%',
    resizeMode: 'center'
  },
  logo2: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain'
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
