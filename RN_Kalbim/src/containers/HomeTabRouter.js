import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer} from 'react-navigation';
import MeasureModal from '../modals/MeasureModal'
import Measure from './Measure';
import History from './History';
import Emergency from './Emergency';
import Profile from './Profile';
import Settings from './Settings';
import colors from '../styles/colors';

const MeasureStack = createStackNavigator({
  Measure:{
    screen:Measure,
    navigationOptions: {
       headerShown:false,
       },
  },  
  MeasureModal:{
    screen:MeasureModal,
    navigationOptions: { 
         headerShown:false,
       },
    
  },  
})

const HomeTabRouter = createBottomTabNavigator(
  {
    Measure: {
      screen: MeasureStack,
      navigationOptions: {
        headerShown:false,
        title: 'Ölçüm',
        tabBarIcon: ({tintColor}) => (
          <Icon name="th-large" size={22} color={tintColor} />
        ),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        title: 'Geçmiş',
        tabBarIcon: ({tintColor}) => (
          <Icon name="history" size={22} color={tintColor} />
        ),
      },
    },
    Emergency: {
      screen: Emergency,
      navigationOptions: {
        title: 'Acil Çağrı',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ambulance" size={22} color={tintColor} />
        ),
      },
    },
    
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Hesap',
        tabBarIcon: ({tintColor}) => (
          <Icon name="user" size={22} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Measure',
    tabBarOptions: {
      fontWeight: '600',
      activeTintColor: colors.white,
      style: {
        backgroundColor: colors.tabbarcolor, //color you want to change
      },
    },
  },
);
const ModalStack = createStackNavigator(
  {
    Tabs: {
      screen: HomeTabRouter
    },
    MeasureModal: {
      screen: MeasureModal,
    },
    Settings:{
      screen:Settings,
    },
    // Profile:{
    //   screen:Profile
    // }

  },
  {
    mode: 'modal',
    headerMode: 'none',
  });

export default createAppContainer(ModalStack);
