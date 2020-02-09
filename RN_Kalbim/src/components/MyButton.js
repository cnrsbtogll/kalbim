import React, {Component} from 'react';
import PropTypes from 'prop-types';
import colors from '../styles/colors';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export default class MyButton extends Component {
  render() {
    const {text, color, backgroundColor, icon, handleOnPress} = this.props;
    return (
      <TouchableOpacity style={[{backgroundColor},styles.wrapper]}
      onPress={handleOnPress}
      >
        <View style={styles.buttonTextWrapper}>
        {icon}
        <Text style={[{color},styles.buttonText]}>{text}</Text>
        </View>
          
      </TouchableOpacity>
    );
  }
}
 MyButton.propTypes = {
   text:PropTypes.string.isRequired,
   icon:PropTypes.object,
   handleOnPress:PropTypes.func.isRequired,
 };
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    padding: 7,
    margin :5,
    borderRadius:25,
    width:350
  },
  buttonTextWrapper:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingLeft:5,
    paddingRight:15,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf:'center',
    width: '100%',
    
  },
});
