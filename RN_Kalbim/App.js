import React, {Component} from 'react';
import {KeyboardAvoidingView} from 'react-native'
import Router from './src/Router';

export default class App extends Component{
  render(){
    return(
      <KeyboardAvoidingView behavior="padding">
        <Router/>
      </KeyboardAvoidingView>
      
    )
  }
}