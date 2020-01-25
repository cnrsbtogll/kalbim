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
import TextInputMask from 'react-native-text-input-mask';
import {Formik} from 'formik';
import colors from '../../styles/colors';
import {API_BASE} from '../../constants';
import axios from 'axios';
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
                <TextInputMask
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordRef._root.focus()}
                  onChangeText={handleChange('Telefon')}
                  value={values.Telefon}
                  placeholder="+90 (555) 555 55 55"
                  placeholderTextColor='gray'
                  mask={"+90 ([000]) [000] [00] [00]"}
                  sytle={styles.input}
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
                  sytle={styles.input}
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
                  sytle={styles.input}
                  onBlur={() => setFieldTouched('passwordConfirm')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                  color={'white'}                  
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
                  <Icon name="log-in"  />
                  {isSubmitting && <Spinner size={'small'} color={'white'} />}
                  <Text style={styles.buttonText}>Giriş</Text>
                  <Text style={{width:60}}/>          
              </Button>
            </Content>
          )}
        </Formik>
        <View style={styles.wrapper2}>
          <Text style={styles.text}>veya</Text>
          <Button
            rounded
            iconLeft
            block
            style={styles.buttonTextWrapper}>
              <Icon type="FontAwesome" name="user"  />
            <Text style={styles.buttonText}>Zaten bir hesabım var</Text>
            <Text style={{width:50}}/>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.bluebackground,
  },
  wrapper2: {
    padding: 10,
    alignItems: 'center',
  },
  input:{
    backgroundColor:'white',
    tintColor:colors.white,
    color:'white',
   
  },
  text: {
    color: colors.white,
    alignSelf: 'center',
  },
  buttonTextWrapper:{
    flexDirection:'row',
    alignItems:'stretch',
    marginTop:10,    
    backgroundColor: colors.blueloginbutton,
  },
  buttonText: {
    textAlign: 'center',
    width: '75%',
  },
});
