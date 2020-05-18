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




import { theme } from "../constants";



export default class Choose_Services extends Component {
    state = {
     
        loading: false
      };
   

    
  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    return(
    
  
        <TouchableWithoutFeedback onpress={()=>{Keyboard.dismiss}}>
        <KeyboardAvoidingView style={styles.forgot} behavior="padding">
          <Block padding={[0, theme.sizes.base * 2]}>
          <Text bold white center>
               {"\n"} {"\n"}
                  </Text>
  
            <Text h1 bold>
              Services
            </Text>
            <Block middle>
            <ScrollView>
               <Text bold white center>
               {"\n"} {"\n"}
                  </Text>
  
              <Button gradient onPress={() => navigation.navigate("Battery_Charge")}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Battery_Charge
                  </Text>
                )}
              </Button>
            
  
              <Button gradient onPress={() => navigation.navigate("Break_Down")}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Break_Down
                  </Text>
                )}
              </Button>

               <Button gradient onPress={() => navigation.navigate("Recovery")}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Recovery
                  </Text>
                )}
              </Button>

               <Button gradient onPress={() => navigation.navigate("RepairingAndChangingTyre")}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Repairing And Changing Tyre
                  </Text>
                )}
              </Button>

               <Button gradient onPress={() => navigation.navigate("Refilling_Fuel")}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Refilling_Fule
                  </Text>
                )}
              </Button>
              <Text bold white center>
             {"\n"} {"\n"}
                </Text>
            
              </ScrollView>
            </Block>
          </Block>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      
       );

  }
}



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
  