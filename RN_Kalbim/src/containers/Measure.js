import React, {Component} from 'react';
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
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

const options = {
  title: 'Fotoğraf Seç',
  //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  allowsEditing: true,  
};

export default class Emergency extends Component {
    constructor(props){
      super(props)
      this.state={
        avatarSource: {uri: "../img/icons8-user-16.png"}
    }
    
  
  }
  
  onSelectPicture=()=>{    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
       // const source = { uri: response.uri };
    
        // You can also display the image using data:
         //const source = { uri: 'data:../img/icons8-user-16.png;base64,' + response.data};        
        this.setState({
          avatarSource:  {
            uri: response.uri
          },
        });
      }
    });
  }
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
                source={this.state.avatarSource}
                onPress={this.onSelectPicture}
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
              onPress={() => alert("bağlandı")}>
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
