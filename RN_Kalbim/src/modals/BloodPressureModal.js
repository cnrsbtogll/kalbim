import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import {Grid, Row, Col, Button, Content, Spinner} from 'native-base';
import colors from '../styles/colors';
import firebase from "../Firebase";

export default class BloodPressureModal extends Component {
  constructor(props){
    super(props);
    //  
    // state'e patient ve measurement resultları null olarak atıyoruz
    // show_ekg ilk başta false olacak, kullanıcı butona basarsa gösterilecek
    this.state = {
      patient: null,
      measurement: null,
    }
  }
  labels = [
    {
      name: 'Çok Düşük',
      labelColor: '#ff5400',
      activeBarColor: '#ff5400',
    },
    
    {
      name: 'Düşük',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },    
    {
      name: 'Normal',
      labelColor: '#00ff6b',
      activeBarColor: '#00ff6b',
    },    
    {
      name: 'Yüksek',
      labelColor: '#f2cf1f',
      activeBarColor: '#f2cf1f',
    },
    {
      name: 'Çok Yüksek',
      labelColor: '#ff5400',
      activeBarColor: '#ff5400',
    }
  ];

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
      let {BuyukTansiyon, KucukTansiyon} = snap.val();
      this.setState({measurement:{BuyukTansiyon, KucukTansiyon}})
    });
  }

  //  
  // component yüklendikten sonra, verileri çekiyoruz
  componentDidMount = () => {
    this.get_patient_data(firebase.auth().currentUser.uid);
    this.get_measurement_data(firebase.auth().currentUser.uid);
  }


  render() {
    let {measurement} = this.state;
    return (
      <Grid style={{backgroundColor:colors.background}}>
        <Content>
        <Row><Text>  </Text></Row>
        <Row>
          <Col style={styles.col}>
            <Text style={styles.text}>Büyük Tansiyon</Text>
            <Text style={styles.text}>90 - 140</Text>
            <Text style={styles.text}>Küçük Tansiyon</Text>
            <Text style={styles.text}>60 - 90</Text>
          </Col>
          <Col></Col>
          <Col style={styles.col}>
            <Text style={styles.text}>Kalp Ritmi</Text>
            <Text style={styles.text}>80 BPM</Text>
          </Col>
        </Row>
        <Row style={styles.row}>
        <Text> </Text>
          </Row>
          <Row style={styles.row}>
        <Text> </Text>
          </Row>
        <Row style={styles.row}>
          <Col style={styles.col}>
            <Text style={styles.text}>Büyük Tansiyon</Text>
            <RNSpeedometer
              size={200}
              labels={this.labels}
              value={measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.BuyukTansiyon}
              minValue={0}
              maxValue={240}
              labelStyle={{color:colors.white}}
            />
          </Col>
          <Col style={styles.col}>
            <Text style={styles.text}>Küçük Tansiyon</Text>
            <RNSpeedometer
              size={200}
              labels={this.labels}
              value={measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.KucukTansiyon}
              labelStyle={{color:colors.white}}
              minValue={0}
              maxValue={160}
            />
          </Col>
        </Row>
        <Row style={styles.row}>
        <Text> </Text>
          </Row>
        <Row style={styles.row}>
        <Text> </Text>
          </Row>
        <Row style={styles.row}>
            <Text> </Text>
          </Row>

        <Row style={styles.row}>
          <Button style={{backgroundColor:colors.tabbarcolor}}>
            <Text style={{color:colors.white}}>       Ölç       </Text>
          </Button>
        </Row>
        </Content>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:colors.white
  }
});
