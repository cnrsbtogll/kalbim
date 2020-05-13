import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer} from 'react-navigation';
import NewRecords from './NewRecords';
import MyPatients from './MyPatients';
import Messages from './Messages';
import About from './About';
import colors from '../styles/colors';

//  
// doktor için tab bar ve routelarının tanımı
const DoctorTabRouter = createBottomTabNavigator(
  {
    NewRecords: {
      screen: NewRecords,
      navigationOptions: {
        headerShown:false,
        title: 'Yeni Kayıtlar',
        tabBarIcon: ({tintColor}) => (
          <Icon name="list" size={22} color={tintColor} />
        ),
      },
    },
    MyPatients: {
      screen: MyPatients,
      navigationOptions: {
        title: 'Hastalarım',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ambulance" size={22} color={tintColor} />
        ),
      },
    },
    Messages: {
      screen: Messages,
      navigationOptions: {
        title: 'Mesajlar',
        tabBarIcon: ({tintColor}) => (
          <Icon name="inbox" size={22} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'NewRecords',
    tabBarOptions: {
      fontWeight: '600',
      activeTintColor: colors.white,
      style: {
        backgroundColor: colors.tabbarcolor, //color you want to change
      },
    },
  },
);
export default createAppContainer(DoctorTabRouter);
