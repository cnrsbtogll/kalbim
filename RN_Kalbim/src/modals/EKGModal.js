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
} from 'native-base';
import colors from '../styles/colors';
import LineChart from '../components/LineChart';
export default class CardShowcaseExample extends Component {
  render() {
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
            <LineChart />
          </Card>
          <Row style={styles.row}>
            <Col style={styles.col}>
              <Text style={styles.text}>SR Max :</Text>

              <Text style={styles.text}>SR Min :</Text>

              <Text style={styles.text}>Solunum Ritmi :</Text>
            </Col>
            <Col style={styles.col}>
              <Text style={styles.text}>Kalp Ritmi : </Text>
              <Text style={styles.text}>HRV :</Text>
              <Text style={styles.text}>Mood :</Text>
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
