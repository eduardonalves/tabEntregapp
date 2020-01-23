import {  createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { flipX } from 'react-navigation-transitions'
import Restaurants from "./components/Restaurants";
import Dishes from "./components/Dishes";
import Cart from "./components/Cart";
import Billing from "./components/Billing";

const MainNavigator = createStackNavigator(
  {
    Restaurants: { screen: Restaurants },
    Dishes: { screen: Dishes },
    Cart: {screen: Cart},
    Billing: {screen: Billing},
  },
  {
    initialRouteName: "Restaurants",
    /*Transition config não é obrigatório, caso queira a animação padrão remova a linha abaixo*/
    //transitionConfig: () => flipX(),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:'#32a852',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    },/**/
  }
)
const Routes = createAppContainer(MainNavigator)
export default Routes;
