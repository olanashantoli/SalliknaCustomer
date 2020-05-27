import React, { Component } from "react";
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  TouchableWithoutFeedback
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
//const VALID_EMAIL = "olahantoli@gmail.com";
const tokennn='';
export default class Battery_Charge extends Component {
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      plate_num: '',
      Email:'',
      errors: [],
      loading: false,

      error: null,
      latitude: null,
      longitude: null,   
      latitudeDelta: 0.0922,
     longitudeDelta: 0.0421,

     notification: {},
 
    }
 
  }

  
  sendPushNotification = async () => {
    const message = {
      to: tokennn,//ETOKEN
      sound: 'default',
      title: 'ACCEPTED ',
      body: 'just wait!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  gettok(){
    fetch('http://192.168.43.137/Server/tok2.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       email: global.Email,
       ID : 'olawalaa@gmail.com',
      
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
         
              isLoading: false,
              tokennn: responseJson,
             // t:responseJson
            }, function() {
              // In this block you can do something with new state.
            });
            console.log("ooooooooooooooooooooo");
       console.log(tokennn ,'ghfgjf');
         }).catch((error) => {
           Alert.alert(
             "Error in json",
             "Please check you Email address.",
             [{ text: "Try again" }],
             { cancelable: false }
           );
           console.error(error);
         }); 
  }

  provider(){

  }
  fun() {
    fetch('http://192.168.43.137/Server/fun.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
     
        Email: global.Email,
        latitude: this.state.latitude,
        longitude:this.state.longitude
      
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });

          /////////////////shortest path 
          ////////////////notification
  }

/* componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  } */

  componentDidMount(){
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        global.latitudem   = this.state.latitude;
        global.longitudem  = this.state.latitude ;
        //this.storecoo();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 , distanceFilter: 10},
    );
  }

  handleCharge() {

    
   
    const { navigation } = this.props;
    fetch('http://192.168.43.137/Server/charge.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        plate_num: this.state.plate_num,
        Email: global.Email,
        latitude: this.state.latitude,
        longitude:this.state.longitude
       
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });
//this.fun();
          /////////////////shortest path 
        //  this.provider();
          ////////////////notification

          this.gettok();//add ID
          this.sendPushNotification();

  }

  render() {
   
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <TouchableWithoutFeedback onpress={()=>{Keyboard.dismiss}}>
      <KeyboardAvoidingView style={styles.Battery_Charge} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
        <ScrollView>
        <Text bold white center>
             {"\n"} 
       
                </Text>
       
          <Text h2 bold>
            Select your vehicle by write it's plate number below
          </Text>
          <Block middle>
            <Input
              label="Plate Number"
              error={hasErrors("plate_num")}
              style={[styles.input, hasErrors("plate_num")]}
              defaultValue={this.state.plate_num}
              onChangeText={plate_num => this.setState({ plate_num: plate_num })}
            />
             <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Button gradient onPress={() => this.handleCharge()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Send Requist
                </Text>
              )}
            </Button>

           
          </Block>
          </ScrollView>
        </Block>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  Battery_Charge: {
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
 
