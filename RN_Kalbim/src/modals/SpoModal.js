import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RNSpeedometer from 'react-native-speedometer'


export default class SpoModal extends Component {
    render() {
        return (
            <View>
             <RNSpeedometer></RNSpeedometer>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
