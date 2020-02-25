import React, {Component} from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import HomeTabRouter from '../../containers/HomeTabRouter';
import ImagePicker from 'react-native-image-picker';
import colors from '../../styles/colors';
import {
  Container,
  Header,
  Title,
  Body,
  Button,
  Right,
  Left,
  Text,
  Content
} from 'native-base';
import {Avatar} from 'react-native-elements';

const options = {
  title: 'Fotoğraf Seç',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  allowsEditing: true,  
  quality:1.0,
  maxWidth:500,
  maxHeight:500,
  noData:true,
};
export default class index extends Component {
  constructor(props){
    super(props)
    this.state={
      avatarSource: {uri: "../img/icons8-user-16.png"}
  }  
}
onSelectPicture=()=>{ 
  ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
     // const source = { uri: response.uri };
  
      // You can also display the image using data:
       //const source = { uri: 'data:../img/icons8-user-16.png;base64,' + response.data};        
      this.setState({
        avatarSource:  {
          uri: response.uri
        },
        avatarName:{
          fileName: response.fileName
        }
      });       
    }
  });    
}
  render() {
    Keyboard.dismiss();
    return (
      <Container style={{backgroundColor: colors.containercolor}}>        
        <Header transparent>
          <Left style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button transparent>
              <Avatar
                size="medium"
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                source={this.state.avatarSource}
                onPress={this.onSelectPicture}
                showEditButton
              />
            </Button>
            <Text style={{color: colors.white}}>Misafir</Text>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button
              style={{backgroundColor: colors.boxcolor}}
              onPress={() => alert('bağlandı')}>
              <Text style={{color: colors.white}}>Cihaza Bağlan</Text>
            </Button>
          </Right>
        </Header>        
        <HomeTabRouter/>          
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
