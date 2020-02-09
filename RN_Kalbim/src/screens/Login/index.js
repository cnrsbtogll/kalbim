import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Body,
  Header,
  Text,
  Button,
  Title,
  Icon,
  Left,
  Right,
} from 'native-base';
import colors from '../../styles/colors';
import LoginForm from './LoginForm';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {observer, inject} from 'mobx-react'

@inject('UserStore')
@observer
export default class Login extends Component {  
  render() {    
    const {UserStore}=this.props;
    return (
      <React.Fragment>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Logout')}
            >
              <Text style={styles.text}>Vazgeç</Text>           
              </TouchableOpacity>            
          </Left>
          <Body>
            <Title>Giriş</Title>
          </Body>
        </Header>
        <LoginForm navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor:colors.bluebackground
  },
  text:{
    color:colors.white,
  }
});
