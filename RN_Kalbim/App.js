import React, {Component, Fragment} from 'react';
import {StatusBar, View, Text} from 'react-native';
import 'react-native-gesture-handler';
import Router from './src/Router';
//mobx store
import store from './src/store';
import {Provider} from 'mobx-react';
console.disableYellowBox = true;

//
// App'i sadeleştirdim, Firebase'i dediğim gibi başka js dosyasında initialize ettim
// App ile aynı anda initialize etmeye çalışınca bazen sorun çıkıyordu

export default class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <Fragment>
          <StatusBar hidden={true} />
          <Router />
        </Fragment>
      </Provider>
    );
  }
}
