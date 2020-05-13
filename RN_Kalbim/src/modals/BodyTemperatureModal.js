import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Grid, Row, Col, Button, Content,Spinner} from 'native-base';
import colors from '../styles/colors';
import firebase from "../Firebase";

const MAX_POINTS_TEMPERATURE = 40;
export default class BodyTemperatureModal extends Component {
  constructor(props){
    super(props);
    //  
    // state'e patient ve measurement resultları null olarak atıyoruz
    // show_ekg ilk başta false olacak, kullanıcı butona basarsa gösterilecek
    this.state = {
      patient: null,
      measurement: {Ates:0},
    }
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
      let {Ates} = snap.val();
      this.setState({measurement:{Ates}})
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
    const fill_temperature = (measurement.Ates / MAX_POINTS_TEMPERATURE) * 100;
    return (
      <Grid style={{backgroundColor:colors.background}}>
        <Content>
        <Row>
          <Col style={styles.col}>
            <Text style={styles.text}>Ateş</Text>
            <Text style={styles.text}>36.2 - 37.3</Text>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row style={styles.row}>
        <Text style={styles.text}>Ateş</Text>
          <AnimatedCircularProgress
            size={180}
            width={15}
            backgroundWidth={5}
            fill={fill_temperature}
            tintColor="yellow"
            tintColorSecondary="green"
            backgroundColor="#3d5875"
            arcSweepAngle={240}
            rotation={180}
            lineCap="round"
            duration={3000}>
            {fill_temperature => (
              <Text style={styles.points}>
                {(MAX_POINTS_TEMPERATURE * fill_temperature) / 100}{' '}
                °C
              </Text>
            )}
          </AnimatedCircularProgress>
        </Row>
        <Row style={styles.row}>
            <Text> </Text>
            <Text> </Text>
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
    flexDirection:'column',
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
    alignItems: 'center',
    marginTop:30
  },
  text:{
    color:colors.white
  }
});
