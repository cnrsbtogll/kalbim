import React, {Component} from 'react';
import MyButton from '../../components/MyButton';
import {StyleSheet, View, Image, SafeAreaView} from 'react-native';
import colors from '../../styles/colors';
import {Icon} from 'native-base';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.onLoginPress = this.onLoginPress.bind(this);
    this.onFacebookLoginPress = this.onFacebookLoginPress.bind(this);
    this.onGoogleLoginPress = this.onGoogleLoginPress.bind(this);
    this.onCreateAccountPress = this.onCreateAccountPress.bind(this);
  }
  onLoginPress() {
    this.props.navigation.navigate('Login');
  }
  onFacebookLoginPress(){
    alert("Facebook Login Button Pressed")
  }
  onGoogleLoginPress(){
    alert("Google Login Button Pressed")
  }
  onCreateAccountPress() {
    this.props.navigation.navigate('CreateAccount');
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
            icon={<Icon name="log-in" style={{color: colors.white}} />}
            handleOnPress={this.onLoginPress}
          />
          <MyButton
            text="Facebook ile Bağlan"
            color={colors.white}
            backgroundColor={colors.bluefacebookloginbutton}
            icon={
              <Icon
                type="FontAwesome"
                name="facebook-f"
                style={{color: colors.white}}
              />
            }
            handleOnPress={this.onFacebookLoginPress}
          />
          <MyButton
            text="Google ile Bağlan"
            color={colors.white}
            backgroundColor={colors.redgoogleloginbutton}
            icon={
              <Icon
                type="FontAwesome"
                name="google"
                style={{color: colors.white}}
              />
            }
            handleOnPress={this.onGoogleLoginPress}
          />
          <MyButton
            text="Hesap Oluştur"
            color={colors.bluebackground}
            backgroundColor={colors.white}
            icon={
              <Icon
                type="FontAwesome"
                name="user-plus"
                style={{color: colors.bluebackground}}
              />
            }
            handleOnPress={this.onCreateAccountPress}
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
