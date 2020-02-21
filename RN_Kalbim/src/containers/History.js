import React, {Component} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Title,
  Left,
  Icon,
  Thumbnail,
  Right,
  Button,
} from 'native-base';
import colors from '../styles/colors';
export default class CardItemButton extends Component {
  render() {
    return (
      <Container style={{backgroundColor: colors.background}}>
        <Header transparent>
          <Body style={{alignItems: 'center'}}>
            <Title>Geçmiş</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem
              header
              bordered
              button
              onPress={() => alert('This is Card Header')}>
              <Text style={{color: colors.black}}>Kan Basıncı (mmHg)</Text>
            </CardItem>
            <CardItem button onPress={() => alert('This is Card Body')}>
              <Body>
                <Text>180</Text>
                <Text>
                  140 ---------------------------------------------------
                </Text>
                <Text>
                  100 ---------------------------------------------------
                </Text>
                <Text>60</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem
              header
              bordered
              button
              onPress={() => alert('This is Card Header')}>
              <Text style={{color: colors.black}}>Kalp Ritmi (bmp)</Text>
            </CardItem>
            <CardItem button onPress={() => alert('This is Card Body')}>
              <Body>
                <Text>
                  100 ---------------------------------------------------
                </Text>
                <Text>70</Text>
                <Text>40</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem
              header
              bordered
              button
              onPress={() => alert('This is Card Header')}>
              <Text style={{color: colors.black}}>Ateş (°C)</Text>
            </CardItem>
            <CardItem button onPress={() => alert('This is Card Body')}>
              <Body>
                <Text>40</Text>
                <Text>
                  38 ---------------------------------------------------
                </Text>
                <Text>36</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem
              header
              bordered
              button
              onPress={() => alert('This is Card Header')}>
              <Text style={{color: colors.black}}> SpO₂ (O₂%)</Text>
            </CardItem>
            <CardItem button onPress={() => alert('This is Card Body')}>
              <Body>
                <Text>100</Text>
                <Text>
                  95 ---------------------------------------------------
                </Text>
                <Text>90</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Left>                
                <Body>
                  <Text>EKG & Solunum Ritmi</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered cardBody>
              <Image
                source={{uri: '../img/pulse22.png'}}
                style={{height: 200, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Text>RRMax : 0</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Text>RRMin : 0</Text>
                </Button>
              </Body>
              <Right>
                <Button transparent>
                  <Text>HRV : 0</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
