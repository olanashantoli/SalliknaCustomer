//This is an example of Tab inside Navigation Drawer in React Native//
import React from 'react';
//import react in our code.
import {
 // createAppContainer,
  createStackNavigator,
 // createMaterialTopTabNavigator,
} from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

//Import all the screens for Tab
import Delete_vehicle from './Delete_vehicle';
import Add_vehicle from './Add_vehicle';

const TabScreen = createMaterialTopTabNavigator(
  {
    Add_vehicle: { screen: Add_vehicle },
    Delete_vehicle: { screen: Delete_vehicle },
    
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#c5bbdd',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
);
const Manage_vehicle = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
export default Manage_vehicle;
