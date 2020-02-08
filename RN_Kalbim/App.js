import React, { Component } from 'react'
import 'react-native-gesture-handler';
import Router from './src/Router'

//mobx store
import store from './src/store'
import {Provider} from 'mobx-react'

console.disableYellowBox=true;

export default class App extends Component {
  render() {
    return (
      //<Home/>
      <Provider {...store}>
        <Router/>
      </Provider>        
    )
  }
}


