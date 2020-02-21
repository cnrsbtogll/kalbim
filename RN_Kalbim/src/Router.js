import React from 'react';
import {Avatar, Button} from 'react-native-elements';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// auth loading
import AuthLoading from './screens/AuthLoading';

// app stack
import Home from './screens/Home';

//auth stack
import Logout from './screens/Logout';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import colors from './styles/colors';

const AuthStack = createStackNavigator(
  {
    Logout: {
      screen: Logout,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Giriş',
        headerTitleAlign: 'center',
        headerShown: false,
      },
    },
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: {
        title: 'Hesap Oluştur',
        headerTitleAlign: 'center',
        headerShown: false,
      },
    },
  },
  {initialRouteName: 'Logout'},
);

const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerLeft: () => (
        <Avatar
          size='small'
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          onPress={() => alert('avatar çalışıyor!')}
          containerStyle={{marginLeft: 5}}
          showEditButton
        />
      ),
      headerRight: () => (
      <Button 
      buttonStyle={{backgroundColor:colors.tabbarcolor}}
      title="Cihaza Bağlan" 
      />
      ),
      headerTitle: '',
      headerShown:false,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: colors.tabbarcolor},
    },
  },
});
const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoading,
    },
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(SwitchNavigator);
