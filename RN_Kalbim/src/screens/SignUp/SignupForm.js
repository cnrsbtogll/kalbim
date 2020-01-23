import React, {Component} from 'react';

import {Button, Content, Input, Item, Spinner, Text} from 'native-base';
import {Formik} from 'formik';

import {API_BASE} from '../../constants';
import axios from 'axios';

import validations from './validations';

export default class SignupForm extends Component {
  _handleSubmit = async ({phone, password}, bag) => {
    try {
      const {data} = await axios.post(`${API_BASE}/register`, {
        phone,
        password,
      });
      bag.setSubmitting(false);

      if (data.hasOwnProperty('errors')) {
        bag.setErrors(data.errors);
        return false;
      }

      this.props.navigation.navigate('SignIn');
    } catch (e) {
      bag.setSubmitting(false);
      bag.setErrors(e);
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          phone: '',
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
            <Item error={errors.phone && touched.phone}>
              <Input
                returnKeyType={'next'}
                onSubmitEditing={() => this.passwordRef._root.focus()}
                onChangeText={handleChange('phone')}
                value={values.phone}
                placeholder="phone"
                onBlur={() => setFieldTouched('phone')}
                autoCorrect={false}
                autoCapitalize={'none'}
                keyboardType={'phone-pad'}
              />

              {errors.phone && touched.phone && (
                <Text style={{color: 'red'}}>{errors.phone}</Text>
              )}
            </Item>

            <Item error={errors.password && touched.password}>
              <Input
                ref={ref => (this.passwordRef = ref)}
                returnKeyType={'next'}
                onSubmitEditing={() => this.passwordConfirmRef._root.focus()}
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="password"
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
                placeholder="password confirmation"
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
              style={{marginTop: 10}}>
              {isSubmitting && <Spinner size={'small'} color={'white'} />}
              <Text>join</Text>
            </Button>
          </Content>
        )}
      </Formik>
    );
  }
}
