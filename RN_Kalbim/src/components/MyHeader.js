import React, {Component} from 'react';
import {
  AsyncStorage,
  Keyboard,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  Modal,
  Image
} from 'react-native';
import {ListItem, Icon} from "native-base";
import ImagePicker from 'react-native-image-picker';
import firebase from '../Firebase';
import colors from '../styles/colors';
import NavigationService from "../NavigationService";
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

//  
// Doktor ve hasta için farklı headerlar oluşturdum, props ile gönderilen veriye göre ikisinden birini döndürüyor

class DocHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: "https://firebasestorage.googleapis.com/v0/b/kalbim-532f8.appspot.com/o/profile_pictures%2Fdoctor.png?alt=media&token=144f7121-6486-42bf-87f9-49d493ebf94f",
      upload: false,
      modalVisible: false, 
      phone: '',
      name: '',
      loaded: false
    };
    let ref = "Doctor/" + firebase.auth().currentUser.uid;
    let db = firebase.database().ref(ref);
    let that = this;
    db.once("value").then(async data => {
        if(data.val()){
            let name = data.val().firstName + " " + data.val().lastName;
            let phone = data.val().phone;
            await that.setState({name, phone, loaded:true, avatarSource:firebase.auth().currentUser.photoURL});
        }
    });
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

  updateUserImage = async imageUrl => {
    await firebase.auth().currentUser.updateProfile({photoURL:imageUrl});
    this.setState({upload: false, avatarSource: {uri: imageUrl}});
  };

  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.avatarSource.uri);
    firebase
      .storage()
      .ref(`profile_pictures/${firebase.auth().currentUser.uid}.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(async(url) => {
        this.updateUserImage(url);
      })
      .catch(error => {
        this.setState({
          upload: false,
          avatarSource: require('../img/user.png'),
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
    let {name, phone} = this.state;
    name = name.split(" ");
    let lastName = "";
    let firstName = name[0];
    for(let i = 1; i < name.length; i++) {
        if(i != name.length-1) firstName = firstName + " " + name[i]; 
        else lastName = name[i];
    }
    console.log(firstName);
    let doc_ref = "Doctor/" + firebase.auth().currentUser.uid.toString();
    if (this.state.name.length < 6 || this.state.name.split(" ").length < 2) {
      Alert.alert('Hata', 'Ad soyad en az 6 karakterden ve iki kelimeden oluşmalıdır.');
    } else if (this.state.phone.length < 10) {
      Alert.alert('Hata', 'Hatalı telefon numarası');
    } else {
      await firebase.database().ref(doc_ref).update({"firstName": firstName, "lastName":lastName, "phone":phone}).then(() => console.log("Firebase saved"));
      this.setModalVisible(!this.state.modalVisible);
    }
  };

  signOut = async() => {
    await firebase.auth().signOut();
  }
  render() {
    
    if(!this.state.loaded) return <View/>
    console.log(this.state.avatarSource);
    return (
        <Header transparent>
          <Left style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button transparent>
              {this.state.upload ? (
                <ActivityIndicator size="small" />
              ) : (
                <Avatar
                  size="medium"
                  rounded
                  source={{uri:this.state.avatarSource}}
                  onPress={this.onSelectPicture}
                  showEditButton
                  imageProps={{resizeMode: 'contain'}}
                />
              )}
            </Button>
            
          </Left>
          <Body>
            <View>
                <Modal 
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <Container style={{marginTop:22}}>
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
                    <Text style={{color: colors.white}}>{this.state.name}</Text>
                </TouchableHighlight>
            </View>
          </Body>
          <Right>
            <Button  onPress={() => this.signOut()} style={{backgroundColor: colors.redgoogleloginbutton}}>
                <Icon active name="log-out" />
            </Button>
          </Right>
        </Header>
      
    );
  }
}

class PatientHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      upload: false,
      modalVisible: false, 
      phone: '',
      name: '',
      loaded: false
    };
    console.log("app check");
    if(!firebase.app) return;
    console.log("app ok");
    while(!firebase.auth().currentUser);
    console.log("whiledan çıktı");
    console.log(firebase.auth().currentUser);
    let ref = "Patient/" + firebase.auth().currentUser.uid;
    let db = firebase.database().ref(ref);
    let that = this;
    db.once("value").then(async data => {
        if(data.val()){
            let name = data.val().firstName + " " + data.val().lastName;
            let phone = data.val().phone;
            await that.setState({name, phone, loaded:true, avatarSource:firebase.auth().currentUser.photoURL});
        }
    });
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
        this.setState({upload: true, avatarSource: {uri: response.uri}}, this.uploadFile,);
      }
    });
  };
  updateUserImage = imageUrl => {
    firebase.auth().currentUser.updateProfile({photoURL:imageUrl});
    this.setState({upload: false, avatarSource: {uri: imageUrl}});
  };
  uploadFile = async () => {
    const file = await this.uriToBlob(this.state.avatarSource.uri);
    firebase
      .storage()
      .ref(`profile_pictures/${firebase.auth().currentUser.uid}.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        this.updateUserImage(url);
      })
      .catch(error => {
        this.setState({ 
          upload: false,
          avatarSource: require('../img/user.png'),
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
    let {name, phone} = this.state;
    name = name.split(" ");
    let lastName = "";
    let firstName = name[0];
    for(let i = 1; i < name.length; i++) {
        if(i != name.length-1) firstName = firstName + " " + name[i]; 
        else lastName = name[i];
    }
    console.log(firstName);
    let patient_ref = "Patient/" + firebase.auth().currentUser.uid.toString();
    if (this.state.name.length < 6 || this.state.name.split(" ").length < 2) {
      Alert.alert('Hata', 'Ad soyad en az 6 karakterden ve iki kelimeden oluşmalıdır.');
    } else if (this.state.phone.length < 10) {
      Alert.alert('Hata', 'Hatalı telefon numarası');
    } else {
      await firebase.database().ref(patient_ref).update({"firstName": firstName, "lastName":lastName, "phone":phone}).then(() => console.log("Firebase saved"));
      this.setModalVisible(!this.state.modalVisible);
    }
  };

  render() {
    return (
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
              <Text style={{color: colors.white}}>{firebase.auth().currentUser.displayName}</Text>
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
    );
  }
}


export default class MyHeader extends Component{
  render(){
    let {is_doctor} = this.props;
    return is_doctor ? <DocHeader/> : <PatientHeader/>
  }
}
