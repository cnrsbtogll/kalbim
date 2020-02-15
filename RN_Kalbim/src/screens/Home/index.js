import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import HomeTabRouter from '../../containers/HomeTabRouter'
import colors from '../../styles/colors';
import { View } from 'native-base';

export default class index extends Component {
    render() {
        return (
            <View style={styles.wrapper}>

                <HomeTabRouter/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
      backgroundColor:colors.containercolor,
    },
  });