import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  Container,
  Header,
  Title,
  Body,
  Button,
  Right,
  Left,
} from 'native-base';
import {Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MyBoxButton from '../components/MyBoxButton';
import colors from '../styles/colors';

export default class Measure extends Component {
  onPress = () => {
    alert('bağlandı');
  };
  render() {
    return (
      <React.Fragment>
        <Header transparent>
          <Left style={{flexDirection:'row', alignItems:'center'}}>
            <Button transparent>
              <Avatar
                size="medium"
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                onPress={() => alert('avatar çalışıyor!')}
                containerStyle={{margin: 2}}
                showEditButton
              />
            </Button >
            <Text style={{color:colors.white}}>Misafir</Text>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button style={{backgroundColor:colors.boxcolor}}
            onPress={() => alert('Bağlandı')} >              
              <Text style={{color:colors.white}}>Cihaza</Text>
              <Text style={{color:colors.white}}>Bağlan</Text>
            </Button>
          </Right>
        </Header>

        <View style={styles.container1}>
          <TouchableOpacity style={styles.itemContainer}>
            <Image source={require('../img/pulse22.png')} style={styles.logo} />
            <Text style={styles.itemName}>EKG & Solunum Ritmi</Text>
            <Text style={styles.itemCode}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <View style={styles.itemContainer2}>
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
          </View>
          <View style={styles.itemContainer2}>
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
          </View>
          <View style={styles.itemContainer2}>
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
          </View>
          <View style={styles.itemContainer2}>
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
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: colors.background,
    marginBottom: 1,
    padding: 5,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  container2: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  itemContainer2: {
    height: '49%',
    width: '49.5%',
    backgroundColor: colors.background,
    margin: 1,
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
  logo: {
    height: 150,
    alignSelf: 'center',
    width: '100%',
  },
  logo2: {
    height: 100,
    width: 100,
  },
});
