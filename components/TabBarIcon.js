import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { Platform } from 'react-native';

export default function TabBarIcon(props) {
  if(Platform.OS === 'ios' ){
    return (
      <Ionicons
        name={props.name}
        size={26}
        style={{ 
          marginBottom: Platform.OS === 'ios' ? 0 : -3 ,
          
        }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }else{
    return (
      <Icon
        name={props.name}
        size={26}
        style={{ 
          marginBottom: Platform.OS === 'ios' ? 0 : -3 ,
          
        }}
        color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
  
}
