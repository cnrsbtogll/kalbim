import React, {Component} from 'react';
import DoctorHome from "./DoctorHome";
import PatientHome from "./PatientHome";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_doctor: this.props.navigation.getParam('is_doctor', false)
    }
  }
  render() {
    let {is_doctor} = this.state;
    return (
      is_doctor ? <DoctorHome/> : <PatientHome/>
    )
  }
}