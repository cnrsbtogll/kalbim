import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Grid, Row, Col, Button} from 'native-base';
import colors from '../styles/colors';

const MAX_POINTS_TEMPERATURE = 100;
export default class HeartRateModal extends Component {
  state = {
    temperature: 80,
  };
  render() {
    const fill_temperature =
      (this.state.temperature / MAX_POINTS_TEMPERATURE) * 100;
    return (
      <Grid style={{backgroundColor:colors.background}}>
        <Row>
          <Col style={styles.col}>
            <Text style={styles.text}>Kalp Ritmi</Text>
            <Text style={styles.text}>70-100</Text>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row style={styles.row}>
        <Text style={styles.text}>Kalp Ritmi</Text>
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
                {Math.round((MAX_POINTS_TEMPERATURE * fill_temperature) / 100)}{' '}
                BMP
              </Text>
            )}
          </AnimatedCircularProgress>
        </Row>
        <Row style={styles.row}>
          <Button style={{backgroundColor:colors.tabbarcolor}}>
            <Text style={{color:colors.white}}>       Ölç       </Text>
          </Button>
        </Row>
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
