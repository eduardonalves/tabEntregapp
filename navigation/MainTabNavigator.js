import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';

import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import Restaurants from '../src/components/Restaurants';
import Orders from '../src/components/Orders';
import Profile from '../src/components/Profile';

import MenuReward from '../src/components/MenuReward';


import Color from '../constants/Colors';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: Restaurants,
  },
  config
);




HomeStack.navigationOptions = {
  tabBarLabel: 'Cardápio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
         Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box' 
      }
     
    />
  ),
};

HomeStack.path = '';


const MenuRewardStack = createStackNavigator(
  {
    MenuReward: MenuReward,
  },
  config
);

MenuRewardStack.navigationOptions = {
  tabBarLabel: 'Recompensas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
         Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy' 
      }
     
    />
  ),
};
MenuRewardStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: Orders,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Meus Pedidos',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon 
    focused={focused} 
    name={
      Platform.OS === 'ios' ? 'ios-cart' : 'md-cart' 
    } 
    
    />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: Profile,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused , tintColor }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios' ? 'ios-person' : 'md-person' 
    }   />
  ),
  
};
SettingsStack.tabBarOptions = {
  inactiveTintColor: Color.tabInactive,
    activeTintColor:Color.tabActive,
}
SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    
    MenuRewardStack,
    SettingsStack,
  },
  {
    tabBarOptions: {
      
      //activeBackgroundColor:Color.tabActive,
      inactiveTintColor: Color.tabInactive,
      activeTintColor:Color.tabActive,
      
      style:{
        backgroundColor:Color.tabBar
        //tintColor:Color.tabActive
      },
      labelStyle: {
        fontSize: 15,
        
      }
    }
    
  }
  );

tabNavigator.path = '';

export default tabNavigator;
