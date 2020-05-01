import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Body, Header, Text, Title, Left} from 'native-base';
import colors from '../../styles/colors';
import AccountInfoForm from './AccountInfoForm';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class AccountInfo extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Header style={styles.header}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Text style={styles.text}>Vazgeç</Text>
            </TouchableOpacity>
          </Left>
          <Body style={styles.title}>
            <Title>Bilgilerim</Title>
          </Body>
        </Header> */}
        <AccountInfoForm navigation={this.props.navigation} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    //flexDirection:"row",
    //alignItems:'flex-end'
  },
  title: {},
  text: {
    color: colors.white,
  },
});
