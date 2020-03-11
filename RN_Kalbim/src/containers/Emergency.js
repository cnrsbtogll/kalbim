import React, {Component} from 'react';
import {StyleSheet, Image, Linking} from 'react-native';
import {
  Container,
  Header,
  Title,
  Body,
  Grid,
} from 'native-base';
import MyBoxButton from '../components/MyBoxButton';
import colors from '../styles/colors';
export default class Emergency extends Component {
    _handleOnPress=()=>{
        let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${112}';
    } else {
      phoneNumber = 'telprompt:${112}';
    }
    Linking.openURL(phoneNumber);
    }
  render() {
    //const uri = ;
    return (
      <Container style={{backgroundColor: colors.containercolor}}>
        <Header transparent>
          <Body style={{alignItems: 'center'}}>
            <Title>Acil Çağrı</Title>
          </Body>
        </Header>
        <Grid style={{alignItems:'center'}}>
          <MyBoxButton
            text="112'yi Ara"
            icon={
              <Image
                source={require('../img/MetroUI-Other-Phone-icon.png')}
                style={{alignSelf:'center'}}
              />
            }
            backgroundColor={colors.containercolor}
            handleOnPress={this._handleOnPress}
          />
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
