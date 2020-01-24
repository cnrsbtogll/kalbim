import React, {Component} from 'react';
import MyButton from '../../components/MyButton';
import {StyleSheet, View, Image, SafeAreaView} from 'react-native';
import colors from '../../styles/colors';

export default class Logout extends Component {
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
          />
          <MyButton
            text="Facebook ile Bağlan"
            color={colors.white}
            backgroundColor={colors.bluefacebookloginbutton}
          />
          <MyButton
            text="Google ile Bağlan"
            color={colors.white}
            backgroundColor={colors.redgoogleloginbutton}
          />
          <MyButton
            text="Hesap Oluştur"
            color={colors.bluebackground}
            backgroundColor={colors.white}
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
