import React, { Component } from 'react'
import 'react-native-gesture-handler';
import Router from './src/Router'



console.disableYellowBox=true;

export default class App extends Component {
  render() {
    return (
      //<Home/>
      <Router/>
    )
  }
}


