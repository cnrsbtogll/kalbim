import React, {Component} from 'react';
import DoctorTabRouter from '../../../doctor_containers/DoctorTabRouter';
import firebase from '../../../Firebase';
import colors from '../../../styles/colors';
import MyHeader from "../../../components/MyHeader";
import {Container} from 'native-base';


export default class DoctorHome extends Component {
  render() {
    //Keyboard.dismiss();
    return (
      <Container style={{backgroundColor: colors.containercolor}}>
        <MyHeader is_doctor={true}/>
        <DoctorTabRouter />
      </Container>
    );
  }
}
