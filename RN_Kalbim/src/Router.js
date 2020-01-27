import {createAppContainer,  createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// auth loading
//import AuthLoading from './screens/AuthLoading';

// app stack
//import Home from './screens/Home';

//auth stack
import Logout from './screens/Logout';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';

const AuthStack = createStackNavigator(
  {
    Logout: {
      screen: Logout,
      navigationOptions: {
        headerShown: false,
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Giriş',
        headerShown: false,
      },
    },
    CreateAccount: {
      screen: CreateAccount,
      navigationOptions: {
        title: 'Hesap Oluştur',
        headerShown: false,
      },
    },
  },
  {initialRouteName: 'Logout'},
);

// const AppStack = createStackNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       title: 'Anasayfa',
//     },
//   },  
// });
// const SwitchNavigator = createSwitchNavigator(
//   {
//    // AuthLoading: {
//    //   screen: AuthLoading,
//    // },
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'App',
//   },
// );

export default createAppContainer(AuthStack);
