import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import colors from '../styles/colors';
import Tab1 from './EKGModal';
import Tab2 from './BloodPressureModal';
import Tab3 from './BodyTemperatureModal';
import Tab4 from './HeartRateModal';
import Tab5 from './SpoModal';

//import { observer,inject } from 'mobx-react'

// @inject('InitialPageStore')
const MeasureTabNavigator = createMaterialTopTabNavigator(
  {
    EKGModal: {
      screen: Tab1,
      navigationOptions: {
        title: 'EKG',
      },
    },
    BloodPressureModal: {
      screen: Tab2,
      navigationOptions: {
        title: 'Tansiyon',
      },
    },
    BodyTemperatureModal: {
      screen: Tab3,
      navigationOptions: {
        title: 'Ateş',
      },
    },
    HeartRateModal: {
      screen: Tab4,
      navigationOptions: {
        title: 'Kalp Ritmi',
      },
    },
    SpoModal: {
      screen: Tab5,
      navigationOptions: {
        title: 'SpO₂',
      },
    },
  },
  {
    tabBarOptions: {
      fontWeight: '600',
      // activeTintColor: colors.white,
      activeTintColor: colors.white,
      inactiveTintColor: '#889094',
      style: {
        backgroundColor: colors.background,
      },
      labelStyle: {fontSize: 11},
    },
    initialRouteName: 'SpoModal',
  },
);
export default createAppContainer(MeasureTabNavigator);
