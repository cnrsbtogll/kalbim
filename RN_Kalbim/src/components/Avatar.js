import { ColorPropType, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'native-base';

export default function Avatar({ size, source}) {
  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
    source:source   
  };

  return (
    <View style={[styles.container, style]}>
      <Image 
      source={source}
      style={{resizeMode:'contain'}}
      ></Image>
      {/* <Text style={styles.text}>{initials}</Text> */}
    </View>
  );
}

Avatar.propTypes = {  
  size: PropTypes.number.isRequired,  
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});