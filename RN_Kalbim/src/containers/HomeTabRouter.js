import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation'
import Measure from './Measure';
import History from './History';
import Emergency from './Emergency';
import Profile from './Profile';

const HomeTabRouter = createBottomTabNavigator(
  {
    Measure: {screen: Measure},
    History: {screen: History},
    Emergency: {screen: Emergency},
    Profile: {screen: Profile},
  },
  {
    initialRouteName: 'Measure',
    tabBarOptions: {
      fontWeight: '600',
    },
  },
);

export default createAppContainer(HomeTabRouter);
