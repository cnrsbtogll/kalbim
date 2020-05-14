import React, {Component} from 'react';
import {StyleSheet, Image,Keyboard, Linking, TouchableOpacity, View, Text, FlatList, Dimensions, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {Container, ListItem, Icon, Item, Spinner} from 'native-base';
import colors from '../styles/colors';
import firebase from '../Firebase';
import { Input, Divider } from 'react-native-elements';

//  
// Buradaki class definitionları farklı js dosyaları oluşturup içinde tutabilirsiniz karışık görüntüyü engellemek adına
// takip etmesi kolay olsun diye tek sayfada tanımladım ben 


//  
// verilen timestamp ile şu an arasındaki zaman farkını hesaplayan fonksiyon
// mesajın ne kadar süre önce yazıldığını hesaplayıp, ona göre string döndürüyor
var get_string = (timestamp) => {
  let now = new Date().getTime();
  let diff = now - timestamp;
  diff = diff / 1000;
  if(diff < 60){
    return "Bir dakikadan önce";
  }
  else if(diff < 3600){
    let min = Math.round(diff / 60);
    return min.toString() + " dakika önce";
  }
  else if(diff < 86400){
    let hr = Math.round(diff / 3600);
    return hr.toString() + " saat önce";
  }
  else if(diff < 604800){
    let day = Math.round(diff / 86400);
    return day.toString() + " gün önce";
  }
  else {
    let week = Math.round(diff / 604800);
    return week.toString() + " hafta önce";
  }
  console.log(now);
}


//  
// mesajı renderlayan fonksiyon, mesajın verisinde gönderici uidsi tutuluyor.
// bu uidye göre, gönderenin şimdiki kullanıcı olup olmadığını kontrol ediyor, ona göre sağa veya sola yaslıyor mesajı
// yine bu koşula göre arkaplan rengi belirliyor mesaj için (farklı göndericilerin mesajları farklı renkte)
class Message extends Component{
  constructor(props){
    super(props);
    let sender = props.message.sender == firebase.auth().currentUser.uid;
    let box_color = sender ? '#474A2A' : '#90965D';
    let text_color = '#dadeef'; //'#323E4A';
    let align = sender ? "flex-end" : "flex-start";
    this.state={
      sender:sender,
      box_color:box_color,
      text_color:text_color,
      align:align
    }
  }
  render(){
    let {message} = this.props;
    let {sender} = this.state;
    let str = get_string(message.timestamp);
    //console.log(message);
    let {box_color, text_color, align} = this.state;
    let {width, height} = Dimensions.get('window');
    return(
      <View style={{width:width*.95, alignItems:align}}>
        <View style={{maxWidth:width*.65, padding :8, marginVertical:6, backgroundColor:box_color, borderRadius:8}}>
          <Text style={{color:text_color, fontSize:14, fontWeight:'400', letterSpacing:1.2}}>{message.text}</Text>
          <Text style={{color:'ccc', fontSize:10, fontWeight:'400', letterSpacing:1, textAlign:sender?'right':'left'}}>{str}</Text>
        </View>
      </View>
    )
  }
}


//  
// Hasta ile olan mesaj sayfasının componenti
// mesajları burada görüntüleyebiliyor, yeni mesaj yazabiliyor
class MessageWithPatient extends Component{
  constructor(props){
    super(props);
    this.state = {
      message_list:{},
      message_written: "",
      trying_to_send: false,
      message_loaded:false,
    }
    this.list = this.list;
    this.message_box = this.message_box;
  }

  //  
  // verilen hasta uidsi ile, şu anki doktorun arasında geçen konuşmaların referansı tanımlanıyor
  // message idlerini timestamp olarak tuttum, o yüzden keylere göre sıralıyor (en yeni mesaj en sonda görüntülenecek)
  get_messages = (p_uid) => {
    let that = this;
    let uid = firebase.auth().currentUser.uid;
    let message_id = p_uid < uid ? p_uid + "_" + uid : uid + "_" + p_uid;
    message_id = "Messages/" + message_id;
    let message_ref = firebase.database().ref(message_id).orderByKey();
    //  
    // eski mesajları yüklüyor
    message_ref.once('value')
    .then(snap => {
      snap.forEach(child_snap => {
        if(p_uid != child_snap.key && uid != child_snap.key){
          that.setState({message_list: {...that.state.message_list, [child_snap.key]:child_snap.val()}});
        }
      })
    }).then(() => this.setState({message_loaded:true}));
    //  
    // Eklenen her mesaj için database'i dinliyor, yeni veri geldiğinde state'i update ediyor
    message_ref.on("child_added", snapshot => {
      if(p_uid != snapshot.key && uid != snapshot.key){
        that.setState({message_list: {...that.state.message_list, [snapshot.key]:snapshot.val()}});
      }      
    })
  }

  componentDidMount = async() => {
    //  
    // Navigation ile aktardığımız için parametreleri, bu şekilde istediğimiz value'ye ulaşabiliyoruz
    let p_uid = this.props.navigation.getParam('p_uid', null);
    let name = this.props.navigation.getParam('name', null);
    this.setState({p_uid, name});
    await this.get_messages(p_uid);
  }

  //  
  // mesaj gönderme ve veritabanına yazma işlemini sağlayan fonksyion
  sendMessage = async() => {
    await this.setState({trying_to_send:true});
    let uid = firebase.auth().currentUser.uid;
    let {p_uid, message_written} = this.state;
    let message_id = p_uid < uid ? p_uid + '_' + uid : uid + '_' + p_uid;
    let timestamp = new Date().getTime();
    message_id = 'Messages/' + message_id +  "/" + timestamp.toString();
    let message_ref = firebase.database().ref(message_id);
    await message_ref.set({
      text: this.state.message_written,
      sender: uid,
      timestamp:timestamp
    });
    //  
    // TextInput için ref tanımlayıp this.message_box değişkeninde tutuyorum 
    this.message_box.blur();
    this.message_box.clear();
    await this.setState({trying_to_send:false});
    this.list.scrollToEnd();
  }

  render(){
    let {message_list, p_uid, name} = this.state;
    let {navigation} = this.props;
    let {width, height} = Dimensions.get('window');
    return(
      <Container style={{alignItems:'center', backgroundColor: colors.containercolor}}>
        <View style={{flex:1, width:width*.95, flexDirection:'row', justifyContent:'space-between', paddingVertical:16, paddingHorizontal:8}}>
          <View style={{flex:1}}>
            <Icon name="arrow-back" style={{color:colors.white}} onPress={() => navigation.pop()}/>
          </View>
          <View style={{flex:8, alignItems:'center'}}>
            <Text style={{fontSize:18, fontWeight:'900', color:'#aeceae'}}>{name}</Text>
          </View>
          <View style={{flex:1}}/>
        </View>
        <Divider style={{height:1, color:'#fff'}}/>
        <View style={{flex:8}}>
          {this.state.message_loaded ? 
            <FlatList
              ref={c => this.list=c}
              data={Object.values(message_list)}
              initialScrollIndex={message_list.length-1}
              onContentSizeChange={() => this.list.scrollToEnd({animated: true})}
              renderItem={(item) => <Message message={item.item}/>}
              keyExtractor={(item) => item.index}
            /> : <Spinner size={18}/>
          
          }
        </View>
        <KeyboardAvoidingView 
          style={{flex:1, width:width*.95, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingVertical:20}}>
          <TextInput
            ref={c => this.message_box = c}
            onChangeText={(text) => this.setState({message_written:text})}
            value={this.state.message_written}
            contextMenuHidden={true}
            enablesReturnKeyAutomatically={true}
            multiline={true}
            returnKeyType="done"
            placeholder="Mesajınız..."
            style={{width:width*.75, backgroundColor:'#657E96', maxHeight:64, borderRadius:8, elevation:5, color:'#90B3D6'}} 
          />
          <TouchableOpacity style={{padding:16, elevation:5}} onPress={this.sendMessage}>
            <Icon name="rightcircleo" type="AntDesign" style={{color:'#90965D', fontSize:32}}/>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

//  
// Mesaj routerı (mesajlar listesi, seçilen hasta ile mesajlaşma penceresini açıyor)
class MessageRouter extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      id: props.p_uid
    }
  }
  render(){
    let {name, id} = this.state;
    let {navigation} = this.props;
    return(
      <TouchableOpacity style={listItemStyle.container} onPress={() => navigation.navigate("MessageWithPatient", {"p_uid":id, 'name':name})}>
        <Text style={listItemStyle.name}>{name}</Text>
        <Icon name="arrow-forward"/>
      </TouchableOpacity>
    )
  }
}

const listItemStyle = StyleSheet.create({
  container: {backgroundColor:'#eee', flexDirection:'row', paddingVertical:16, paddingHorizontal:16, borderRadius:8, alignItems:'center', justifyContent:'space-between'},
  name: {fontWeight:'bold', fontSize:16, letterSpacing:2}
})


//  
// Mesaj listesinin gösterildiği component
class Messages extends Component {
  constructor(props){
    super(props);
    this.state={
      messaged_patients: [],
      patient_names: [],
    }
  }

  get_patient_list = async(uid) => {
    let that = this;
    let ref = "Doctor/" + uid + "/patients";
    let db_ref = firebase.database().ref(ref);
    await db_ref.on('child_added', snap => {
      let p_uid = snap.key;
      let message_id = p_uid < uid ? p_uid + "_" + uid : uid + "_" + p_uid;
      let message_ref = firebase.database().ref("Messages/" + message_id);
      message_ref.once('value').then(mes_snap => {
        if(mes_snap.exists()) {
          that.setState({patient_names: [...that.state.patient_names, mes_snap.val()[p_uid]]});
          that.setState({messaged_patients: [...that.state.messaged_patients, snap.key]});
        }
      });
    });
  }

  componentDidMount = async() => {
    await this.get_patient_list(firebase.auth().currentUser.uid);
  }

  render() {
    let {width, height} = Dimensions.get('window');
    let {messaged_patients, patient_names} = this.state;
    let {navigation} = this.props;
    Keyboard.dismiss();
    return (
      <Container style={{backgroundColor: colors.containercolor, alignItems:'center'}}>
        <Text style={{fontSize:18, color:colors.white, fontWeight:'800', letterSpacing:2, paddingVertical:16}}>Mesajar</Text>
        <View style={{width:width*.95}}>
          <FlatList 
            data={messaged_patients}
            keyExtractor={(item, index) => item.index}
            renderItem={(item, index) => <MessageRouter p_uid={item.item} name={patient_names[item.index]} navigation={navigation}/>}/>
        </View>
      </Container>
    );
  }
}


//  
// Mesaj stack'i 
const MessageStack = createStackNavigator({
  Messages: {
    screen: Messages,
    navigationOptions:{
      header: null
    }
  },
  MessageWithPatient: {
    screen: MessageWithPatient,
    navigationOptions:{
      header: null
    }
  }
})

export default MessageStack;
