import React, {Component} from 'react';
import PropTypes from 'prop-types';
import colors from '../styles/colors';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export default class MyButton extends Component {
  render() {
    const {text, color, backgroundColor} = this.props;
    return (
      <TouchableOpacity style={[{backgroundColor},styles.wrapper]}>
        <Text style={[{color},styles.buttonText]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
// MyButton.PropTypes = {
//   text: PropTypes.string.isRequired,
// };
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    padding: 10,
    marginTop: 5,
    borderRadius:25,
    width:350
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    
  },
});
