import React, { Component } from "react";
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  TouchableWithoutFeedback,
  Picker
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";


export default class RepairingAndChangingTyre extends Component {
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      plate_num: '',
      type:'',
      num:'',
      rad:'',
      Email:'',
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

  handlefuel() {
    const { navigation } = this.props;

    fetch('http://192.168.43.137/Server/tyre.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        plate_num: this.state.plate_num,
    
        type: this.state.type,
    
        num: this.state.num,

        rad:this.state.rad,
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
          //if picker=''....
        }
  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <TouchableWithoutFeedback onpress={()=>{Keyboard.dismiss}}>
      <KeyboardAvoidingView style={styles.Delete_vehicle} behavior="padding">
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
                <Picker
	             	style={{width:'70%'}}
	             	selectedValue={this.state.type}
	            	onValueChange={(itemValue,itemIndex) => this.setState({type:itemValue})}
	             	>
	             	<Picker.Item label="Select What You Want To Do " value=""/>
	            	<Picker.Item label="Repairing" value="Repairing" />
	            	<Picker.Item label="changing" value="changing"/>
                <Picker.Item label="maybe both" value="maybe both"/>
	            	</Picker>

            {/*   <Input
              label=" how much you need "
              error={hasErrors("num")}
              style={[styles.input, hasErrors("num")]}
              defaultValue={this.state.num}
              onChangeText={num => this.setState({ num: num })}
            />
             */}
              <Picker
	             	style={{width:'70%'}}
	             	selectedValue={this.state.num}
	            	onValueChange={(itemValue,itemIndex) => this.setState({num:itemValue})}
	             	>
	             	<Picker.Item label=" Number Of Tyres You Need" value=""/>
	            	<Picker.Item label="1" value="1" />
	            	<Picker.Item label="2" value="2"/>
                <Picker.Item label="3" value="3" />
	            	<Picker.Item label="4" value="4"/>
                <Picker.Item label="5" value="5" />
	            	<Picker.Item label="6" value="6"/>
                <Picker.Item label="7" value="7" />
	            	<Picker.Item label="8" value="8"/>
	            	</Picker>
     
            <Input
              label="Tyre Size "
              error={hasErrors("rad")}
              style={[styles.input, hasErrors("rad")]}
              defaultValue={this.state.rad}
              onChangeText={rad => this.setState({ rad: rad })}
            />
            
            <Button gradient onPress={() => this.handlefuel()}>
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
  Delete_vehicle: {
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
 