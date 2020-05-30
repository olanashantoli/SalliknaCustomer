
  import React, { useEffect,Component } from "react";
  import {Image,
    Alert,
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet ,
    TouchableWithoutFeedback,
    ScrollView,
    AsyncStorage,
    Vibration
  } from "react-native";
  
  import { Button, Block, Input, Text } from "../components";
  import { theme } from "../constants";
  import { createAppContainer } from "react-navigation";
  import call from 'react-native-phone-call';
  export default class CALL extends Component {
    
  
    
    constructor(props){
     
      super(props);
      
      this.state={ errors: [],
      isLoading: true,
     
    };
      
    }
  
  
   
   
  
   
 
  
  
  
       police () {
      
        const args = {
            number: '100', // String value with the number to call
            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
        }
       call(args).catch(console.error)
   
     
       }


       Ambulance(){
        const args = {
            number: '101', // String value with the number to call
            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
        }
       call(args).catch(console.error)
   
       }
  
       Fire(){
        const args = {
            number: '102', // String value with the number to call
            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
        }
       call(args).catch(console.error)
   
       }

       ourprovider(){
        const args = {
            number: '042507723', // String value with the number to call
            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
        }
       call(args).catch(console.error)
   

       }
    render() {
      const { navigation } = this.props;
    //  const errors = [];
  
      const { loading } = this.state;
    // const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
  
      return (
        <TouchableWithoutFeedback onpress={()=>{Keyboard.dismiss}}>
        <KeyboardAvoidingView style={styles.forgot} behavior="padding">
          <Block padding={[0, theme.sizes.base * 2]}>
          <Text bold white center>
               {"\n"} {"\n"}
                  </Text>
  
            <Text h1 bold>
            Emergency Call
            </Text>
            <Block middle>
            <ScrollView>
               <Text bold white center>
               {"\n"} {"\n"}
                  </Text>
  
              <Button gradient onPress={() => this.police()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Police
                  </Text>
                )}
              </Button>
            
  
              <Button gradient onPress={() =>this.Ambulance()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                   Ambulance
                  </Text>
                )}
              </Button>

               <Button gradient onPress={() => this.Fire()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Firefighter
                  </Text>
                )}
              </Button>

               <Button gradient onPress={() => this.ourprovider()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                     live support
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
  