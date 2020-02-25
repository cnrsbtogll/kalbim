import React, {Component,Fragment} from 'react';
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler';
import Router from './src/Router';
import NavigationService from './src/NavigationService';
import * as firebase from 'firebase';

//mobx store
import store from './src/store';
import {Provider} from 'mobx-react';

console.disableYellowBox = true;

export default class App extends Component {
  // state={
  //   status:false
  // }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyB1I0NItpAv3sI_IbAB5wbQd0EOxCpXH1U',
      authDomain: 'kalbim-532f8.firebaseapp.com',
      databaseURL: 'https://kalbim-532f8.firebaseio.com',
      projectId: 'kalbim-532f8',
      storageBucket: 'kalbim-532f8.appspot.com',
      messagingSenderId: '837905386058',
      appId: '1:837905386058:web:65606af7805229b2df34b3',
      measurementId: 'G-PZBS372TEV',
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    //firebase.analytics();
  }
  render() {
    return (
      <Provider {...store}>
        <Fragment>
          <StatusBar hidden={true}/>
        <Router
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />        
        </Fragment>
      </Provider>
    );
  }
}
