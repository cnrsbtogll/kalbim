import React, {Component} from 'react';
import {
  AsyncStorage,
  Keyboard,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import HomeTabRouter from '../../containers/HomeTabRouter';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
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
  View,
  Content,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import {Avatar} from 'react-native-elements';
import {observer, inject} from 'mobx-react';
import AuthStore from '../../store/AuthStore';

const options = {
  title: 'Fotoğraf Seç',
  storageOptions: {
    skipBackup: true,
    waitUntilSaved: true,
    cameraRoll: true,
    path: 'images',
  },
  allowsEditing: true,
  quality: 1.0,
  maxWidth: 500,
  maxHeight: 500,
  mediaType: 'photo',
  noData: true,
};
@observer
@inject('AuthStore')
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: require('../../img/user.png'),
      upload: false,
      modalVisible: false, 
      phone: '',
      name: '',
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  onSelectPicture = () => {
    ImagePicker.showImagePicker(options, response => {
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
        this.setState(
          {
            upload: true,
            avatarSource: {uri: response.uri},
          },
          this.uploadFile,
        );
      }
    });
  };
  updateUser = () => {
    console.log(AuthStore.id)
    firebase
      .database()
      .ref('users')
      .child(AuthStore.id)
      .set(
        AuthStore,        
      );
    Alert.alert('Başarılı', 'Kayıt Başarılı');
  };
  updateUserImage = imageUrl => {
    AuthStore.image = imageUrl;
    this.updateUser();
    this.setState({upload: false, avatarSource: {uri: imageUrl}});
  };
  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.avatarSource.uri);
    firebase
      .storage()
      .ref(`profile_pictures/${AuthStore.id}.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        this.updateUserImage(url);
      })
      .catch(error => {
        this.setState({
          upload: false,
          avatarSource: require('../../img/user.png'),
        });
        Alert.alert('Hata', 'Fotoğraf yüklenirken hata oluştu.');
      });
  };
  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new Error('Fotoğraf yüklenirken hata oluştu.'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };
  handleChange = key => val => {
    this.setState({[key]: val});
  };
  submitForm = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Hata', 'Ad soyad en az 3 karakterden oluşmalıdır.');
    } else if (this.state.phone.length < 10) {
      Alert.alert('Hata', 'Hatalı telefon numarası');
    } else {
      //save user data
      await AsyncStorage.setItem('userPhone', this.state.phone);
      AuthStore.phone = this.state.phone;
      AuthStore.name=this.state.name;
      AuthStore.saveName(this.state.name);
      this.updateUser();      
      this.setModalVisible(!this.state.modalVisible);
      //Alert.alert('Başarılı', `Bilgileriniz  ${AuthStore.name} başarıyla kaydedildi`);
    }
  };
  render() {
    //Keyboard.dismiss();
    return (
      <Container style={{backgroundColor: colors.containercolor}}>
        <Header transparent>
          <Left style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button transparent>
              {this.state.upload ? (
                <ActivityIndicator size="small" />
              ) : (
                <Avatar
                  size="medium"
                  rounded
                  source={this.state.avatarSource}
                  onPress={this.onSelectPicture}
                  showEditButton
                  imageProps={{resizeMode: 'contain'}}
                />
              )}
            </Button>
            <View style={{marginTop: 22}}>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                }}>
                <Container>
                  <Content>
                    <Form>
                      <Item floatingLabel>
                        <Label>Ad Soyad</Label>
                        <Input
                          value={this.state.name}
                          onChangeText={this.handleChange('name')}
                          autoCorrect={true}
                          autoFocus={true}
                        />
                      </Item>
                      <Item floatingLabel>
                        <Label>Telefon(Başında sıfır olmadan)</Label>
                        <Input
                          keyboardType="phone-pad"
                          value={this.state.phone}
                          onChangeText={this.handleChange('phone')}
                        />
                      </Item>
                      <Button
                        style={{
                          marginTop: 30,
                          marginLeft: 30,
                          marginRight: 30,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          this.submitForm();
                        }}>
                        <Text>Kaydet</Text>
                      </Button>
                      <Button
                        bordered
                        danger
                        style={{
                          marginTop: 5,
                          marginLeft: 30,
                          marginRight: 30,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>Vazgeç</Text>
                      </Button>
                    </Form>
                  </Content>
                </Container>
              </Modal>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Text style={{color: colors.white}}>{AuthStore.name}</Text>
              </TouchableHighlight>
            </View>
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
        <HomeTabRouter />
      </Container>
    );
  }
}
