import React, {Component} from 'react';
import {StyleSheet,Keyboard, Image, View, Text, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { Divider } from 'react-native-elements';
import {Icon} from "native-base";
import colors from '../styles/colors';
import LineChart from '../components/LineChart';
import {Container} from 'native-base';
import RecordCard from "./doctor_components/RecordCard";
import firebase from "../Firebase";

// @hbt1903
// Yeni kayıtları gösteren sayfanın containeri

export default class NewRecords extends Component {
  // @hbt1903
  // constructorda records adında array oluşturuyoruz, verileri bunun içine fetch_records fonksiyonuyla atıyoruz
  // state'de tutma sebebimiz de, veriler asenkronize fetch edildiğinden ne zaman fetch işleminin tamamlanacağını bilmiyoruz
  // state'i update ettiğimizde otomatik olarak yeniden renderlayacak
  constructor(props){
    super(props);
    this.state = {
      records: [],
      refreshing: false
    }
  }

  // @hbt1903
  // fetch_records fonksiyonu kayıtları fetch ediyor
  fetch_records = () => {
    // @hbt1903
    // refreshing değişkeni FlatList'e ait, listenin yenilendiğini gösteriyor
    // db için ref tanımlayıp daha sonra o ref üzerinden veri çekeceğiz
    // orderby(checked) ile checked indexini kontrol edeceğimizi söylüyoruz
    // equalTo(0) ile de checked valuelerinin 0 olduğu datalar için ref istediğimizi söylüyoruz
    this.setState({refreshing:true});
    let db_ref = firebase.database().ref("Records").orderByChild("checked").equalTo(0);
    // @hbt1903
    // state içerisindeki recordsa doğrudan push yapamadığımız için records adında boş aray oluşturup, verileri onun içine pushluyoruz
    // işlem bittiğinde de o verileri state içerisindeki recordsa kaydediyoruz
    let records = [];
    db_ref.once('value').then((snap) => {
      snap.forEach(child => {
        let record = child.val();
        record.id = child.key;
        records.push(record);
      })
    }).then(() => this.setState({records, refreshing:false}))
  }

  // @hbt1903
  // component yüklendikten sonra, fetch fonksiyonunu çağırıyoruz, o da statei update ediyor
  componentDidMount = () => {
    this.fetch_records();
  }

  render() {
    Keyboard.dismiss();
    let {records} = this.state;
    console.log(records);
    return (
      <View style={{flex:1, alignItems:'center'}}>
        <Text style={{fontSize:18, color:colors.white, fontWeight:'800', letterSpacing:2, paddingVertical:16}}>Yeni Kayıtlar</Text>
        <FlatList 
          onRefresh={this.fetch_records}
          refreshing={this.state.refreshing}
          data={records} 
          renderItem={((item, index) => <RecordCard record={item.item} that={this}/>)}
          keyExtractor={((item, index) => item.index)}
          contentContainerStyle={{paddingBottom:16}}/>
      </View>
        
    );
  }
}
