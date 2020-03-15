import React, {Component} from 'react';
import {Keyboard, Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Button,
  Text,
  Left,
  Body,
  Title,
  Right,
  Icon,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';
import colors from '../styles/colors';

export default class About extends Component {
  render() {
    Keyboard.dismiss();
    var firstImage = require('../img/healthcare.png');
    return (
      <Container style={{backgroundColor: colors.containercolor}}>
        <Header transparent>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Hakkında</Title>
          </Body>
        </Header>
        <Content>
          <Card transparent>            
            <CardItem cardBody style={{backgroundColor:"transparent"}}>
              <Image
                source={firstImage}
                style={{
                  resizeMode: 'contain',
                  height: 100,
                  width: null,
                  flex: 1,
                }}
              />
            </CardItem>            
          </Card>
          <Card transparent>
            <CardItem style={{backgroundColor:"transparent"}}>
              <Body>
                <Text style={{color:colors.white}}>
                Kalbim ile dilediğiniz zaman, dilediğiniz yerde EKG çekebilr, anlaşmalı doktorlarlarımız ile paylaşabilirsiniz. Kalp krizi riskine karşı önleminizi almış olursunuz.
                </Text>
              </Body>
            </CardItem>
          </Card>
          <List>
            <ListItem>
              <Left>
                <Text style={{color: colors.white}}>Cihaz Donanım Sürümü</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward-circle" />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={{color: colors.white}}>Cihaz Donanım Sürümü</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward-circle" />
              </Right>
            </ListItem>
          </List>
          
        </Content>
      </Container>
    );
  }
}


