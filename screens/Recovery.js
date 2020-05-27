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

//const VALID_EMAIL = "olahantoli@gmail.com";

export default class Recovery extends Component {
  
  constructor(props) {
 
    super(props)
 
    this.state = {
      Email:'',
      plate_num: '',
      phone:'',
      errors: [],
      loading: false,
      latitude: null,
      longitude: null,   
      latitudeDelta: 0.0922,
     longitudeDelta: 0.0421
 
    }
 
  }

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

  handlerecovery() {
    const { navigation } = this.props;

    fetch('http://192.168.43.137/Server/recovery.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        plate_num: this.state.plate_num,
    
        phone: this.state.phone,
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
  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <TouchableWithoutFeedback onpress={()=>{Keyboard.dismiss}}>
      <KeyboardAvoidingView style={styles.Recovery} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
        <ScrollView>
        <Text bold white center>
             {"\n"} {"\n"}
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
            <Input
              label="Mobıle Number"
              error={hasErrors("phone")}
              style={[styles.input, hasErrors("phone")]}
              defaultValue={this.state.phone}
              onChangeText={phone => this.setState({ phone: phone })}
            />
            
           
            <Text bold white center>
             {"\n"} {"\n"}
                </Text>
            <Button gradient onPress={() => this.handlerecovery()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Send Requist
                </Text>
              )}
            </Button>

                  <Text bold white center>
             {"\n"} {"\n"}
                </Text>
          </Block>
          </ScrollView>
        </Block>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  Recovery: {
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
 