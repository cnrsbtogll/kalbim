import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AuthLoading from './screens/AuthLoading';
import Home from './screens/Home';
import Logout from './screens/Logout';
import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import colors from './styles/colors';

const AuthStack = createStackNavigator({
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

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: Home,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    initialRouteParams: {is_doctor: false}
  },
);

export default createAppContainer(SwitchNavigator);
