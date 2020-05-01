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
import * as firebase from 'firebase';
import validations from './validations';

export default class AccountInfoForm extends Component {
  _handleSubmit = async ({email, password}) => {
    try {
      firebase.auth()
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
            name: '',
            surname: '',
            tel: '',
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
              <Item error={errors.name && touched.name}>
                <Input
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.surnameRef._root.focus()}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder="Adınız"
                  style={styles.input}
                  onBlur={() => setFieldTouched('name')}
                  autoCapitalize={'none'}
                  keyboardType={'default'}
                  autoCorrect={true}
                  autoFocus={true}
                />

                {errors.name && touched.name && (
                  <Text style={{color: 'red'}}>{errors.name}</Text>
                )}
              </Item>

              <Item error={errors.surname && touched.surname}>
                <Input
                  ref={ref => (this.surnameRef = ref)}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.telRef._root.focus()}
                  onChangeText={handleChange('surname')}
                  value={values.surname}
                  placeholder="Soyadınız"
                  style={styles.input}
                  onBlur={() => setFieldTouched('surname')}
                />

                {errors.surname && touched.surname && (
                  <Text style={{color: 'red'}}>{errors.surname}</Text>
                )}
              </Item>

              <Item error={errors.tel && touched.tel}>
                <Input
                  ref={ref => (this.telRef = ref)}
                  returnKeyType={'go'}
                  onChangeText={handleChange('tel')}
                  value={values.tel}
                  placeholder="Telefon"
                  style={styles.input}
                  onBlur={() => setFieldTouched('tel')}
                  keyboardType='phone-pad'
                />

                {errors.tel && touched.tel && (
                  <Text style={{color: 'red'}}>{errors.tel}</Text>
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
                <Text style={styles.buttonText}>Kaydet</Text>
                <Text style={{width: 60}} />
              </Button>
            </Content>
          )}
        </Formik>        
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
