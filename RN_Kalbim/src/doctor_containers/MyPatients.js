import React, {Component} from 'react';
import {Image,Keyboard, Text, FlatList, View, Dimensions, StyleSheet} from 'react-native';
import {Container} from 'native-base';
import colors from '../styles/colors';
import firebase from "../Firebase";

//  
// listenin header componenti
class ListHeader extends Component{
  render(){
    return(
      <View style={listHeaderStyle.container}>
        <View style={listHeaderStyle.titleContainer}>
          <Text style={listHeaderStyle.title}>Ad</Text>
        </View>
        <View style={listHeaderStyle.titleContainer}>
          <Text style={listHeaderStyle.title}>Soyad</Text>
        </View>
        <View style={listHeaderStyle.titleContainer}>
          <Text style={listHeaderStyle.title}>Cinsiyet</Text>
        </View>
      </View>
    )
  }
}

const listHeaderStyle = StyleSheet.create({
  container: {flexDirection:'row', justifyContent:'space-around', backgroundColor:'#ccc', paddingVertical:8, elevation:2},
  titleContainer: {flex:1, alignItems:'center'},
  title: {fontSize:16, fontWeight:'800', letterSpacing:2},
});

//  
// listenin item componenti (patient verileri için)
class ListItem extends Component{
  render(){
    let {patient, index} = this.props;
    let evenColor = '#886';
    let oddColor = '#aa8';
    let containerStyle = index % 2 == 0 ? {...listItemStyle.container, backgroundColor:evenColor} : {...listItemStyle.container, backgroundColor:oddColor}
    return(
      <View style={containerStyle}>
        <View style={listItemStyle.titleContainer}>
          <Text style={listItemStyle.info}>{patient.FirstName}</Text>
        </View>
        <View style={listItemStyle.titleContainer}>
          <Text style={listItemStyle.info}>{patient.LastName}</Text>
        </View>
        <View style={listItemStyle.titleContainer}>
          <Text style={listItemStyle.info}>{patient.Gender}</Text>
        </View>
      </View>
    )
  }
}

const listItemStyle = StyleSheet.create({
  container: {flexDirection:'row', justifyContent:'space-around', backgroundColor:'#ccc', paddingVertical:8, elevation:2},
  titleContainer: {flex:1, alignItems:'center'},
  info: {fontSize:14, fontWeight:'800', letterSpacing:2},
});

//  
// Hastalarım componenti
export default class MyPatients extends Component {
  constructor(props){
    super(props);
    this.state={
      patients_loaded: false,
      patient_details: {},
    }
  }

  //  
  // hasta listesini ve hasta verilerini alan fonksiyon
  // boş bir obje tanımlayıp, {uid1:{data1}, uid2:{data2}} şeklinde tutuyoruz
  // doktor tablosunda, şu anki doktoru bulup (Doctor/uid) bunun hastalarına erişiyoruz (Doctor/uid/PatientDetails)
  // daha sonra elde ettiğimiz hasta idleri ile, hasta tablosundan o hastanın verilerine erişiyoruz (Patient/p_id/PatientDetails)
  get_patient_list = async(uid) => {
    let that = this;
    var patients = {};
    let ref = "Doctor/" + uid + "/patients";
    let db_ref = firebase.database().ref(ref);
    await db_ref.on('child_added', snap => {
      let pat_ref = firebase.database().ref("Patient/" + snap.key + "/PatientDetails");
      pat_ref.once('value').then(pat_snap => {
        that.setState({patient_details: {...that.state.patient_details, [snap.key]:pat_snap.val()}})
      });
    });
  }

  componentDidMount = async() => {
    await this.get_patient_list(firebase.auth().currentUser.uid);
    await this.setState({patients_loaded:true});
  }

  render() {
    let {width, height} = Dimensions.get('window');
    let {patient_details, patients_loaded} = this.state;
    Keyboard.dismiss();
    return (
      <Container style={{backgroundColor: colors.containercolor, alignItems:'center'}}>
        <Text style={{fontSize:18, color:colors.white, fontWeight:'800', letterSpacing:2, paddingVertical:16}}>Hastalarım</Text>
        <View style={{width:width*.95, backgroundColor:'#666', borderRadius:4, overflow:'hidden'}}>
          {Object.values(patient_details).length == 0 ? 
            <Text style={{color:'#ccc'}}>Şu anda hiç hastanız yok!</Text>
            :<FlatList 
              data={Object.values(patient_details)} 
              keyExtractor={(item, index) => index}
              ListHeaderComponent = {() => <ListHeader/>}
              renderItem = {(item, index) => <ListItem patient={item.item} index={item.index}/>}
            />}
        </View>
      </Container>
    );
  }
}
