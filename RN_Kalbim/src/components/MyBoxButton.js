import React, {Component} from 'react';
import PropTypes from 'prop-types';
import colors from '../styles/colors';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export default class MyButton extends Component {
  render() {
    const {text, text2, color, backgroundColor, icon, handleOnPress} = this.props;
    return (
      <TouchableOpacity style={[{backgroundColor},styles.wrapper]}
      onPress={handleOnPress}
      >
        <View style={styles.buttonTextWrapper}>
        {icon}
        <Text style={[{color},styles.buttonText]}>{text}</Text>
        <Text style={[{color},styles.buttonText2]}>{text2}</Text>
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
    width:'100%',
    height:'100%',
    justifyContent:'center',
    paddingLeft:30,
    paddingTop:10
    
    
  },
  buttonTextWrapper:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around'
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    alignSelf:'flex-end',
    textAlign: 'center',
    alignSelf:'center',
   
    
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    alignSelf:'center',
   
    
  },
});
