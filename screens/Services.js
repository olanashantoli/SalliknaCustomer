import React , { Component } from "react";
import { Image ,Alert,
    ScrollView,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet ,
    TouchableWithoutFeedback } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Button, Block, Input, Text } from "../components";


import Choose_Services from "../screens/Choose_Services";
import Battery_Charge from "../screens/Battery_Charge";
import Break_Down from "../screens/Break_Down";
import Recovery from "../screens/Recovery";
import Refilling_Fuel from "../screens/Refilling_Fuel";
import RepairingAndChangingTyre from "../screens/RepairingAndChangingTyre";

import { theme } from "../constants";



export default class Services extends React.Component {

  

    
  render() {
    const { navigation } = this.props;
   
    return(
    
        
     <AppContainer />
       );

  }
}

const AppNavigator = createStackNavigator({
  Choose_Services: {
        screen: Choose_Services
      },
  Battery_Charge: {
    screen: Battery_Charge
  },
  Break_Down: {
    screen: Break_Down
  },
  Recovery: {
    screen: Recovery
  },
  Refilling_Fuel: {
    screen: Refilling_Fuel
  },
  RepairingAndChangingTyre: {
    screen: RepairingAndChangingTyre
  },
  initialRouteName: "Choose_Services"

});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    forgot: {
      flex: 1,
      justifyContent: "center"
    },
    input: {
      borderRadius: 0,
      borderWidth: 0,
      borderBottomColor: theme.colors.gray2,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    hasErrors: {
      borderBottomColor: theme.colors.accent
    }
  });
  