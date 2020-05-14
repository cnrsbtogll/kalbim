import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Card,
  Row,
  Col,
  Text,
  Button,
  View,Spinner
} from 'native-base';
import colors from '../styles/colors';
import LineChart from '../components/LineChart';
import firebase from "../Firebase";

export default class EKGModal extends Component {
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
  //  
  // verilen patient id için verileri çeken fonksiyon
  get_patient_data = (p_uid) => {
    let pat_ref = firebase.database().ref('Patient/' + p_uid + '/PatientDetails');
    pat_ref.once('value').then(snap => this.setState({patient:snap.val()}));
    let mes_ref = firebase.database().ref('Patient/' + p_uid + '/MeasurementResults').orderByKey().limitToLast(1);
    mes_ref.once('value').then(snap => snap.forEach(mes => this.get_measurement_data(mes.val().OlcID)));
  }

  //  
  // verilen measurement id için verileri çeken fonksiyon
  get_measurement_data = (m_uid) => {
    let mes_ref = firebase.database().ref('Measurement/' + m_uid);
    mes_ref.once('value')
    .then(snap => {
      //  
      // Ben aşağıdaki verileri çektim, nasıl isterseniz değiştirebilirsiniz, değişken isimleri firebasedeki ile aynı olmalı
      let {KalpAtisi, QT, RR, PR, QRS, JTPEAK,TPEAKTEND,TPEAKTPEAKP, AVL} = snap.val();
      this.setState({measurement:{KalpAtisi, QT, RR, PR, QRS,JTPEAK,TPEAKTEND,TPEAKTPEAKP, AVL}})
    });
  }
  
  //  
  // component yüklendikten sonra, verileri çekiyoruz
  componentDidMount = () => {
    this.get_patient_data(firebase.auth().currentUser.uid);
  }
  render() {
    let {measurement} = this.state;
    return (
      <Container style={{backgroundColor: colors.background}}>
        <Content>
          <Row><Text>  </Text></Row>
          <Row style={styles.row}>
            <Col style={styles.col}>
              <Text style={styles.text}>EKG & Solunum Ritmi</Text>
            </Col>
            <Col style={styles.col}>
              <Text style={styles.text}>Sayfa Hızı:25mm/s</Text>
              <Text style={styles.text}>Genlik:10mm/mV</Text>
            </Col>
          </Row>
          <Card style={{flex: 0}}>
          {measurement != null? <LineChart data={Object.values(measurement.AVL)}/> : <View/>}
          </Card>
          <Row style={styles.row}>
            <Col style={styles.col}>
              <Text style={styles.text}>RR : {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.RR}</Text>

              <Text style={styles.text}>PR : {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.PR}</Text>

              <Text style={styles.text}>QT : {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.QT}</Text>
            </Col>
            <Col style={styles.col}>
              <Text style={styles.text}>Kalp Ritmi : {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.KalpAtisi}</Text>
              <Text style={styles.text}>JTPEAK : {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.JTPEAK}</Text>
              <Text style={styles.text}>QRS : {measurement == null ? <Spinner style={{width:12, height:12}} size={12}/> : measurement.QRS}</Text>
            </Col>
          </Row>
          <Row >
            <Text></Text>           
          </Row>
          <Row >
            <Text></Text>           
          </Row>
          <Row >
            <Text></Text>           
          </Row>
          <Row style={styles.row}>
            <Button style={{backgroundColor: colors.tabbarcolor}}>
              <Text style={{color: colors.white}}> Ölç </Text>
            </Button>
          </Row>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  points: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  col: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  text: {
    color: colors.white,
  },
  chart: {
    width: 200,
    height: 200,
  },
});
