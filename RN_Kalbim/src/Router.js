import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// auth loading
import AuthLoading from './screens/AuthLoading';

// app stack
import Home from './screens/Home';
import AccountInfo from './screens/AccountInfo';

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
      headerTitle: '',
      headerShown: false,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: colors.tabbarcolor},
    },
  },
  AccountInfo: {
    screen: AccountInfo,
    navigationOptions: {
      headerTitle: 'Bilgilerim',
      headerShown: true,
      headerTintColor: 'white',
      headerStyle: {backgroundColor: colors.background},
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
