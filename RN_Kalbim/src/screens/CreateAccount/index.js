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
import CreateAccountForm from './CreateAccountForm';

export default class CreateAccount extends Component {
  render() {
    return (
      <React.Fragment>
        <Header style={styles.header}>
          <Left>            
              <Text style={styles.text}>Kapat</Text>           
          </Left>
          <Body>
            <Title>Hesap Oluştur</Title>
          </Body>
        </Header>
        <CreateAccountForm navigation={this.props.navigation} />
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
