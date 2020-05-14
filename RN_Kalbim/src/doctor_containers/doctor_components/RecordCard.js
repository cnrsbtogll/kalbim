import React, {Component} from 'react';
import {StyleSheet,Keyboard, Image, View, Text, FlatList, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { Divider } from 'react-native-elements';
import {Icon} from "native-base";
import colors from '../../styles/colors';
import LineChart from '../../components/LineChart';
import {Container, Spinner} from 'native-base';
import firebase from "../../Firebase";


//  
// Kayıtların gösterildiği kart componenti
export default class RecordCard extends Component{
  constructor(props){
    super(props);
    //  
    // state'e patient ve measurement resultları null olarak atıyoruz
    // show_ekg ilk başta false olacak, kullanıcı butona basarsa gösterilecek
    this.state = {
      show_ekg: false,
      patient: null,
      measurement: null,
    }
  }

  //  
  // show_ekg'yi true ise false, false ise true yapan fonksiyon
  toggle_ekg = () => {
    this.setState({show_ekg:!this.state.show_ekg});
  }

  //  
  // verilen patient id için verileri çeken fonksiyon
  get_patient_data = (p_uid) => {
    let pat_ref = firebase.database().ref('Patient/' + p_uid + '/PatientDetails');
    pat_ref.once('value').then(snap => this.setState({patient:snap.val()}));
  }

  //  
  // verilen measurement id için verileri çeken fonksiyon
  get_measurement_data = (m_uid) => {
    let mes_ref = firebase.database().ref('Measurement/' + m_uid);
    mes_ref.once('value')
    .then(snap => {
      //  
      // Ben aşağıdaki verileri çektim, nasıl isterseniz değiştirebilirsiniz, değişken isimleri firebasedeki ile aynı olmalı
      let {BuyukTansiyon, KucukTansiyon, Ates, PR, QRS, AVL} = snap.val();
      this.setState({measurement:{BuyukTansiyon, KucukTansiyon, Ates, PR, QRS, AVL}})
    });
  }

  //  
  // component yüklendikten sonra, verileri çekiyoruz
  componentDidMount = () => {
    this.get_patient_data(this.props.record.patient_id);
    this.get_measurement_data(this.props.record.measurement_id);
  }

  //  
  // doktor kartlardan birine basınca, onu checked yapıyoruz ve doktor idsini o anki doktora eşitliyoruz
  handle_register_doctor = () => {
    let id = this.props.record.id;
    let {that} = this.props;
    let record_ref = firebase.database().ref("Records/"+id);
    record_ref.update({checked:1, doctor_id: firebase.auth().currentUser.uid}).then(() => Alert.alert("Hastayı başarılı bir şekilde eklediniz"));
    that.fetch_records();
  }

  render(){
    let {patient, measurement} = this.state;
    let {width, height} = Dimensions.get("window"); 
    return(
      <TouchableOpacity style={{...recordStyles.container, width:width*.95}} onPress={this.handle_register_doctor}>
        <Text style={recordStyles.nameText}>
          <Text style={recordStyles.nameLabel}>Hastanın Adı: </Text>
          {/*   */}
          {/* Patient null ise spinnerı gösteriyor, yüklenince verisini gösteriyor */}
          {patient == null ? <Spinner style={{width:12, height:12}} size={12}/> : patient.FirstName + " " + patient.LastName}
        </Text>
        <Divider style={{marginVertical:8}}/>
        <View style={recordStyles.infoContainer}>
          <Text style={recordStyles.infoText}>
            <Text style={recordStyles.infoLabel}>Büyük Tansiyon: </Text>
            {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.BuyukTansiyon}
          </Text>
          <Text style={recordStyles.infoText}>
            <Text style={recordStyles.infoLabel}>Küçük Tansiyon: </Text>
            {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.KucukTansiyon}
          </Text>
        </View>
        <View style={recordStyles.infoContainer}>
          <Text style={recordStyles.infoText}>
            <Text style={recordStyles.infoLabel}>PR: </Text>
            {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.PR}
          </Text>
          <Text style={recordStyles.infoText}>
            <Text style={recordStyles.infoLabel}>Ateş: </Text>
            {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.Ates}
          </Text>
          <Text style={recordStyles.infoText}>
            <Text style={recordStyles.infoLabel}>QRS: </Text>
            {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.QRS}
          </Text>
        </View>
        <Divider style={{marginVertical:8}}/>
        <TouchableOpacity style={{flexDirection:"row", justifyContent:'space-between'}} onPress={this.toggle_ekg}>
          <Text style={{...recordStyles.nameLabel, fontSize:18}}>EKG Kartı</Text>
          {this.state.show_ekg ? <Icon name="upcircleo" type="AntDesign"/> : <Icon name="downcircleo" type="AntDesign"/>}
        </TouchableOpacity>
        {this.state.show_ekg  && measurement != null? <LineChart data={Object.values(measurement.AVL)}/> : <View/>}
      </TouchableOpacity>
    )
  }
}

const recordStyles = StyleSheet.create({
  container: {backgroundColor:'#666', marginTop:8, paddingHorizontal:12, paddingVertical:8, borderRadius:4, elevation:5},
  nameText: {color:'#eee', fontSize:16, fontWeight:'800'},
  nameLabel: {color:'#000', fontWeight:'bold', letterSpacing:1},
  infoContainer: {flexDirection:'row', justifyContent:'space-between', paddingVertical:8},
  infoText: {color:'#eee', fontSize:14, fontWeight:'800'},
  infoLabel:{color:'#000', fontWeight:'bold', letterSpacing:1}
})
