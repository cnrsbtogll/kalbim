import React, {Component} from 'react';
import HomeTabRouter from '../../../containers/HomeTabRouter';
import firebase from '../../../Firebase';
import colors from '../../../styles/colors';
import {Container} from 'native-base';
import MyHeader from '../../../components/MyHeader';


export default class PatientHome extends Component {
  render() {
    return (
      <Container style={{backgroundColor: colors.containercolor}}>
        <MyHeader is_doctor={false}/>
        <HomeTabRouter />
      </Container>
    );
  }
}
