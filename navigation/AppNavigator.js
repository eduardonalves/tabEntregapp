import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Image,
  TouchableOpacity,
} from "react-native";

import MainTabNavigator from './MainTabNavigator';
import Dishes from '../src/components/Dishes';
import Cart from '../src/components/Cart';
import Billing from '../src/components/Billing';
import Restaurants from '../src/components/Restaurants';
import FormLogin from '../src/components/FormLogin';

import MenuReward from '../src/components/MenuReward';
import Jokenpo from '../src/components/Jokenpo';
import FormCadastro from '../src/components/FormCadastro';
import FormRecover from '../src/components/FormRecover';
import ViewOrder from '../src/components/ViewOrder';
import Color from '../constants/Colors';
import MyGifts from '../src/components/MyGifts';

const Routes = createStackNavigator(
  {
    Dishes: { screen: Dishes },
    Cart: {screen: Cart},
    Billing: {screen: Billing},
    Restaurants:{screen: Restaurants},
    MenuReward:{screen: MenuReward},
    ViewOrder:{screen: ViewOrder},
    Jokenpo:{screen:Jokenpo},
    MyGifts: {screen:MyGifts}
  },
  {
    initialRouteName: "Dishes",
    /*Transition config não é obrigatório, caso queira a animação padrão remova a linha abaixo*/
    //transitionConfig: () => flipX(),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:Color.headerBar,
      },
      headerTintColor: Color.headerBarTitle,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      
    },
  }
);

const RoutesLogin = createStackNavigator(
  {
    FormLogin: { screen: FormLogin },
    FormCadastro: { screen: FormCadastro },
    FormRecover: { screen: FormRecover} 
  },
  {
    initialRouteName: "FormLogin",
    /*Transition config não é obrigatório, caso queira a animação padrão remova a linha abaixo*/
    //transitionConfig: () => flipX(),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:Color.headerBar,
      },
      headerTintColor: Color.headerBarTitle,
      headerTitle: "Recuperar Senha",
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      
    },
  }
);

export default createAppContainer(
  createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Routes:Routes,
    RoutesLogin:RoutesLogin,
  },
  {
    initialRouteName: "Main",
    /*Transition config não é obrigatório, caso queira a animação padrão remova a linha abaixo*/
    //transitionConfig: () => flipX(),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:Color.headerBar,
      },
      headerTintColor: Color.headerBarTitle,
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    },
  }
  )
);
