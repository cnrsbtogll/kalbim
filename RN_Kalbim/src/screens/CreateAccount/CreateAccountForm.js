import React, {Component} from 'react';
import { StyleSheet } from 'react-native'
import {Button, Content, Input, Item, Spinner, Text, View} from 'native-base';
import {Formik} from 'formik';
import colors from '../../styles/colors'
import {API_BASE} from '../../constants';
import axios from 'axios';
import MyButton from '../../components/MyButton'
import validations from './validations';

export default class CreateAccountForm extends Component {
  _handleSubmit = async ({Telefon, Şifre}, bag) => {
    try {
      const {data} = await axios.post(`${API_BASE}/register`, {
        Telefon,
        Şifre,
      });
      bag.setSubmitting(false);

      if (data.hasOwnProperty('errors')) {
        bag.setErrors(data.errors);
        return false;
      }

      this.props.navigation.navigate('Login');
    } catch (e) {
      bag.setSubmitting(false);
      bag.setErrors(e);
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Formik
          initialValues={{
            Telefon: '',
            Şifre: '',
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
              <Item error={errors.Telefon && touched.Telefon}>
                <Input
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordRef._root.focus()}
                  onChangeText={handleChange('Telefon')}
                  value={values.Telefon}
                  placeholder="Telefon"
                  onBlur={() => setFieldTouched('Telefon')}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  keyboardType={'phone-pad'}
                />

                {errors.Telefon && touched.Telefon && (
                  <Text style={{color: 'red'}}>{errors.Telefon}</Text>
                )}
              </Item>

              <Item error={errors.Şifre && touched.Şifre}>
                <Input
                  ref={ref => (this.passwordRef = ref)}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordConfirmRef._root.focus()}
                  onChangeText={handleChange('Şifre')}
                  value={values.Şifre}
                  placeholder="Şifre"
                  onBlur={() => setFieldTouched('Şifre')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                {errors.Şifre && touched.Şifre && (
                  <Text style={{color: 'red'}}>{errors.Şifre}</Text>
                )}
              </Item>

              <Item error={errors.passwordConfirm && touched.passwordConfirm}>
                <Input
                  ref={ref => (this.passwordConfirmRef = ref)}
                  returnKeyType={'go'}
                  onChangeText={handleChange('passwordConfirm')}
                  value={values.passwordConfirm}
                  placeholder="Şifre Tekrar"
                  onBlur={() => setFieldTouched('passwordConfirm')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                {errors.passwordConfirm && touched.passwordConfirm && (
                  <Text style={{color: 'red'}}>{errors.passwordConfirm}</Text>
                )}
              </Item>

              <Button
                block
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                style={{marginTop: 10,backgroundColor:colors.blueloginbutton}}>
                {isSubmitting && <Spinner size={'small'} color={'white'} />}
                <Text>Giriş</Text>
              </Button>
            </Content>
          )}
        </Formik>
      <View style={styles.wrapper2}>
        <Text style={styles.text}>veya</Text>
        <Button 
          block info
          style={{marginTop: 10,backgroundColor:colors.blueloginbutton}}
        >
            <Text>Zaten bir hesabım var</Text>
          </Button>
      </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  wrapper:{
      flex:1,
      backgroundColor:colors.bluebackground,
  },
  wrapper2:{
    padding:10,
    alignItems:'center'
  },
  text:{
    color:colors.white,
    marginBottom:15
  }
})