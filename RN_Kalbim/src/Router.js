import React from "react";
import { createBottomTabNavigator,createAppContainer } from "react-navigation";
//natine nase
import {Icon } from 'native-base';
//auth stack
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
const AuthStack=createBottomTabNavigator({
    SignIn:{
        screen:SignIn,
        navigationOptions:{
            title:'Giriş Yap',
            tabBarIcon: ({tintColor})=><Icon name="log-in" style={{color:tintColor}}/>
        }
    },
    SignUp:{
        screen:SignUp,
        navigationOptions:{
            title:'Üye Ol',
            tabBarIcon: ({tintColor})=><Icon name="person-add" style={{color:tintColor}}/>
        }
}
},
{
    initialRouteName:'SignUp',
    tabBarOptions:{
        activeTintColor:'#fff',
        inactiveTintColor:'#586589',
        style:{
            backgroundColor:'#171f33'
        }
    }
}
);
export default createAppContainer(AuthStack);