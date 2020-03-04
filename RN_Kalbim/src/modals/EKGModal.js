import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { Row, Col, Button, Grid} from 'native-base';
import colors from '../styles/colors';
import LineChart from '../components/LineChart'

export default class EKGModal extends React.PureComponent {
  render() {
    return (
      <Grid style={{backgroundColor: colors.background}}>
        <Row size={1} >
          <Col style={styles.col}>
            <Text style={styles.text}>EKG & Solunum Hızı</Text>
          </Col>

          <Col style={styles.col}>
            <Text style={styles.text}>Sayfa Hızı:25mm/s</Text>
            <Text style={styles.text}>Genlik:10mm/mV</Text>
          </Col>
        </Row>
        <Row size={5} style={{padding: 10, backgroundColor: 'white'}}>        
        <LineChart/>
        </Row>
        <Row size={2} style={styles.row}>
          <Button style={{backgroundColor: colors.tabbarcolor}}>
            <Text style={{color: colors.white}}>     Ölç     </Text>
          </Button>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
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
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
  },
  chart: {
    width: 200,
    height: 200,
  },
});
