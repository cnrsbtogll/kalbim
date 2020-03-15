import React, {Component} from 'react';
import { Keyboard } from 'react-native'
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';
import colors from '../styles/colors';

import {inject} from 'mobx-react'

@inject('AuthStore')
export default class Profile extends Component {
  render() {
    Keyboard.dismiss()
    return (
      <Container style={{backgroundColor: colors.containercolor}}>
        <Header transparent >
          <Body style={{alignItems:'center'}}>
            <Title>Hesap</Title>
          </Body>
        </Header>
        <Content>
          <ListItem 
          icon 
          onPress={() => {              
            this.props.navigation.navigate('Settings')}}
          >
            <Left>
              <Button style={{backgroundColor: '#FF9501'}}>
                <Icon active name="settings" />
              </Button>
            </Left>
            <Body>
              <Text style={{color: colors.white}}>Ayarlar</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem 
          icon
          onPress={() => {              
            this.props.navigation.navigate('About')}}
          >
            <Left>
              <Button style={{backgroundColor: '#007AFF'}}>
                <Icon active name="information" />
              </Button>
            </Left>
            <Body>
              <Text style={{color: colors.white}}>Hakkında</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem 
          icon
          onPress={() => this.props.AuthStore.removeID()}
          >
            <Left>
              <Button style={{backgroundColor: colors.redgoogleloginbutton}}>
                <Icon active name="log-out" />
              </Button>
            </Left>
            <Body>
              <Text style={{color: colors.white}}>Çıkış</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
