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
import {  Dropdown }  from 'react-native-material-dropdown';

export default class Refilling_Fuel extends Component {
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      plate_num: '',
      PickerValue:'',
      num:'',
      Email:'',
      errors: [],
      loading: false
 
    }
 
  }

  handlefuel() {
    const { navigation } = this.props;

    fetch('http://192.168.43.137/Server/fuel.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        plate_num: this.state.plate_num,
    
        PickerValue: this.state.PickerValue,
    
        num: this.state.num,
        Email: global.Email
    
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

   /*  let data = [{
      value: 'bnzeen',
    }, {
      value: 'solar',
    }, {
      value: 'dezel',
    }]; */

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
          
         {/* {  this.renderDropdown()} */}
      {/*    <Dropdown
        label=' Fuel Type'
        data={this.props.menuItems}//data
        onChangeText={(value) => { this.setState({selectedValue: value } ); } }
       // containerStyle={styles.dropdownStyle}
          
      />
      */}

        <Input
              label=" how much liter you need "
              error={hasErrors("num")}
              style={[styles.input, hasErrors("num")]}
              defaultValue={this.state.num}
              onChangeText={num => this.setState({ num: num })}
            />
            
  <Picker
		style={{width:'70%'}}
		selectedValue={this.state.PickerValue}
		onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
		>
		<Picker.Item label="Select a type" value=""/>
		<Picker.Item label="solar" value="solar" />
		<Picker.Item label="dessel" value="dessel"/>
		</Picker>


            
          
          {/*   <Input
              label="type of بنزين"
              error={hasErrors("plate_num")}
              style={[styles.input, hasErrors("plate_num")]}
              defaultValue={this.state.plate_num}
              onChangeText={text => this.setState({ plate_num: text })}
            /> */}
           
           <Text bold white center>
             {"\n"} {"\n"}
                </Text>
            
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

