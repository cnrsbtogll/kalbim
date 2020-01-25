import React, {Component} from 'react';
import MyButton from '../../components/MyButton';
import {StyleSheet, View, Image, SafeAreaView} from 'react-native';
import colors from '../../styles/colors';
import { Icon } from 'native-base'

export default class Logout extends Component {
  onLoginPress(){
    alert('login buton pressed');
  }
  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <Image
          source={require('../../img/healthcare.png')}
          style={styles.logo}
        />
        <View>
          <MyButton
            text={'Giriş Yap'}
            color={colors.white}
            backgroundColor={colors.blueloginbutton}
            icon={<Icon name="log-in" style={{ color: colors.white }}/> }
            handleOnPress={this.onLoginPress}
          />
          <MyButton
            text="Facebook ile Bağlan"
            color={colors.white}
            backgroundColor={colors.bluefacebookloginbutton}
            icon={<Icon type="FontAwesome" name="facebook-f" style={{ color: colors.white }}/> }
          />
          <MyButton
            text="Google ile Bağlan"
            color={colors.white}
            backgroundColor={colors.redgoogleloginbutton}
            icon={<Icon type="FontAwesome" name="google" style={{ color: colors.white }}/> }
          />
          <MyButton
            text="Hesap Oluştur"
            color={colors.bluebackground}
            backgroundColor={colors.white}
            icon={<Icon type="FontAwesome" name="user-plus" style={{ color: colors.bluebackground }}/> }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.bluebackground,
  },
  logo: {
    width: 180,
    height: 180,
  },
});
