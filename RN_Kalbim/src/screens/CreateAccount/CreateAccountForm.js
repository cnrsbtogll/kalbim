import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Button,
  Content,
  Input,
  Item,
  Spinner,
  Text,
  Icon,
  View,
} from 'native-base';
import {Formik} from 'formik';
import colors from '../../styles/colors';
import auth from '@react-native-firebase/auth';
import validations from './validations';

export default class CreateAccountForm extends Component {
  _handleSubmit = async ({email, password}) => {
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          if (errorCode === 'auth/email-already-in-use') {
            alert('Zaten böyle bir hesap mencut.');
          }
        });
      this.props.navigation.navigate('Home');
    } catch (e) {
      alert('Beklenmedik bir hata oluştu. Yeniden deneyin.');
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            passwordConfirm: '',
          }}
          onSubmit={this._handleSubmit}
          validationSchema={validations}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            isValid,
            isSubmitting,
          }) => (
            <Content style={{padding: 10}}>
              <Item error={errors.email && touched.email}>
                <Input
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordRef._root.focus()}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder="e-mail"
                  style={styles.input}
                  onBlur={() => setFieldTouched('email')}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                  autoCorrect={true}
                  autoFocus={true}
                />

                {errors.email && touched.email && (
                  <Text style={{color: 'red'}}>{errors.email}</Text>
                )}
              </Item>

              <Item error={errors.password && touched.password}>
                <Input
                  ref={ref => (this.passwordRef = ref)}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordConfirmRef._root.focus()}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  placeholder="Şifre"
                  style={styles.input}
                  onBlur={() => setFieldTouched('password')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                {errors.password && touched.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
              </Item>

              <Item error={errors.passwordConfirm && touched.passwordConfirm}>
                <Input
                  ref={ref => (this.passwordConfirmRef = ref)}
                  returnKeyType={'go'}
                  onChangeText={handleChange('passwordConfirm')}
                  value={values.passwordConfirm}
                  placeholder="Şifre Tekrar"
                  style={styles.input}
                  onBlur={() => setFieldTouched('passwordConfirm')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                {errors.passwordConfirm && touched.passwordConfirm && (
                  <Text style={{color: 'red'}}>{errors.passwordConfirm}</Text>
                )}
              </Item>

              <Button
                rounded
                block
                iconLeft
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                style={styles.buttonTextWrapper}>
                <Icon name="log-in" />
                {isSubmitting && <Spinner size={'small'} color={'white'} />}
                <Text style={styles.buttonText}>Kayıt Ol</Text>
                <Text style={{width: 60}} />
              </Button>
            </Content>
          )}
        </Formik>
        <View style={styles.wrapper2}>
          <Text style={{color: '#fff'}}>veya</Text>
          <Button
            rounded
            iconLeft
            block
            onPress={() => this.props.navigation.navigate('Login')}
            style={styles.buttonTextWrapper}>
            <Icon type="FontAwesome" name="user" />
            <Text style={styles.buttonText}>Zaten bir hesabım var</Text>
            <Text style={{width: 50}} />
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper2: {
    padding: 10,
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    fontSize: 20,
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    backgroundColor: colors.blueloginbutton,
  },
  buttonText: {
    textAlign: 'center',
    width: '75%',
  },
});
