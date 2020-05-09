import React, {Component} from 'react';
import {StyleSheet, Switch} from 'react-native';
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
import {observer, inject} from 'mobx-react';

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_doctor: false
    }
  }
  
  _handleSubmit = async ({email, password}, bag) => {
    try {
      let is_doctor = this.state.is_doctor; 
      await firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if(is_doctor){
          let doc_ref = firebase.database().ref("Doctor").child(firebase.auth().currentUser.uid);
          doc_ref.once('value', snap => {
            if(!snap.exists()) is_doctor = false;
          })
        }
        this.setState({is_doctor});
        this.onLoginSuccess()
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if (errorCode === 'auth/user-not-found') {
          alert('Kayıtlı mail adresi bulunamadı. Lütfen kayıt olun.');
        } else if (errorCode === 'auth/wrong-password') {
          alert('Şifre hatalı.');
        }
      });
      bag.setSubmitting(false);
    } catch (e) {
      bag.setSubmitting(false);
			bag.setErrors(e)
      alert('Beklenmedik bir hata oluştu. Yeniden deneyin.');
    }
  };

  onLoginSuccess = async () =>{
    //const mToken = await firebase.auth().currentUser.getIdToken(true);    
    //const deviceID=DeviceInfo.getUniqueID(); 
    const userMail=await firebase.auth().currentUser.email; 
    const userID = await firebase.auth().currentUser.uid;  
    const userName = await firebase.auth().currentUser.displayName;  
    this.props.navigation.navigate('Home', {is_doctor:this.state.is_doctor});
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={this._handleSubmit.bind(this)}
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
                  Text="123456"
                  style={styles.input}
                  onBlur={() => setFieldTouched('password')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                {errors.password && touched.password && (
                  <Text style={{color: 'red'}}>{errors.password}</Text>
                )}
              </Item>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>                  
                <Switch
                    trackColor={{ false: "#8f8f8f", true: "#8f8f8f" }}
                    thumbColor={this.state.is_doctor ? "#64ef64" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => this.setState({is_doctor:!this.state.is_doctor})}
                    value={this.state.is_doctor}/>
                <Text style={{color:'#ccc', fontSize:14, fontWeight:'600', letterSpacing:1.1}}>
                  Ben Doktorum!
                </Text>
              </View>
              <Button
                rounded
                block
                iconLeft
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                style={styles.buttonTextWrapper}>
                <Icon name="log-in" />
                {isSubmitting ? <Spinner style={styles.buttonText} size={'small'} color={'white'}/> : <Text style={styles.buttonText}>Giriş</Text>}
                
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
            onPress={() => this.props.navigation.navigate('CreateAccount')}
            style={styles.buttonTextWrapper}>
            <Icon type="FontAwesome" name="user-plus" />
            <Text style={styles.buttonText}>Hesap Oluştur</Text>
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
  buttonTextWrapper: {
    display:"flex",
    flexDirection: 'row',
    //justifyContent: 'flex-start',
    //alignItems:'flex-end',
    marginTop: 10,
    backgroundColor: colors.blueloginbutton,
  },
  buttonText: {
    textAlign: 'center',
    width: '75%',
  },
  input: {
    color: '#fff',
    fontSize: 20,
  },
});
