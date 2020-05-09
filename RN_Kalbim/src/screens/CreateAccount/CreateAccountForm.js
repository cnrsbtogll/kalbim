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

export default class CreateAccountForm extends Component {
  constructor(props){
    // doktor-hasta switchi için state ekledim 
    super(props);
    this.state={
      is_doctor: false
    }
  }
  // Handle Submit fonksiyonunu doktor-hasta ayrımını yapacak şekilde güncelledim
  _handleSubmit = async ({email, password}) => {
    try {
      let {is_doctor} = this.state;
      let db_ref = is_doctor ? "Doctor/" : "Patient/";
      let data = {
        email:email,
        firstName: "Yeni",
        lastName: is_doctor ? "Doktor" : "Hasta",
        phone: "5381234567"};
      if(is_doctor) data.degree = "123456";
      // firebase'e kaydedilecek veriyi oluşturdum 
      console.log("data is ready");
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          // user oluşturulduysa, database'e veriyi yazacağım yerin referansını ayarladım
          db_ref = db_ref + user.user.uid.toString();
          // veriyi kaydettim ve kullanıcının displayName'ini güncelledim
          firebase.database().ref(db_ref).set(data)
          .then(() => user.user.updateProfile({displayName:data.firstName + " " + data.lastName, photoURL:'../../img/user.png'}))
          .catch(e => console.log(e.message));
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          if (errorCode === 'auth/email-already-in-use') {
            alert('Zaten böyle bir hesap mencut.');
          }
        });
      //is_doctor parametresini navigation'a geçirdim (Home Pagede kontrolleri yapmak için kullandım)
      this.props.navigation.navigate('Home', {is_doctor:is_doctor});
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
