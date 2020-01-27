import {createBottomTabNavigator} from 'react-navigation-tabs';

import Measure from './Measure';
import History from './History';
import Emergency from './Emergency';
import Profile from './Profile';

const HomeTabRouter = createBottomTabNavigator(
  {
    Measure: {screen: Measure},
    Histoty: {screen: History},
    Emergency: {screen: Emergency},
    Profile: {screen: Profile},
  },
  {
    tabBarOptions: {
      fontWeight: '600',
    },
  },
);

export default HomeTabRouter;
