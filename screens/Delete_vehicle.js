import React, { Component } from "react";
import {ScrollView,
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

export default class Delete_vehicle extends Component {
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      reg_num: '',
   Email:'',
      errors: [],
      loading: false
 
    }
 
  }


  handledelete() {
    const { navigation } = this.props;
    fetch('http://192.168.43.137/Server/DelVehicle.php', {
      method: 'POST',///////////////
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: global.Email,
        reg_num: this.state.reg_num
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });
        }

  /*   const { reg_num } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
   
    if (!reg_num) errors.push("reg_num");
    this.setState({ errors, loading: false });

    fetch('http://192.168.100.113:3000/customervehiclesDELETE/'+plate_num, {
      method :'DELETE',

       headers:{
        'Accept':'application/json',
        'Content-Type ': 'application/json',
      },  
       body:JSON.stringify({
       
         PlateNumber: this.state.plate_num,
     
      }) 
  })
        .then(response => response.json())
       
        .then((res)=>{
          if (res.success===true){
            var email= res.message;
            AsyncStorage.setItem('email',email);
            console.log("sssssss");
           // navigation.navigate("Login");////for test put it  profile insted of sallikna

          }
          else{
           console.log("fffffff");
           Alert. alert(res.message);
          }
        })
.done();

    if (!errors.length) {
      Alert.alert(
        "vehicle deleted!","",
   
        [
          {
            text: "OK",
           
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error",
        "Please check you Email address.",
        [{ text: "Try again" }],
        { cancelable: false }
      );
    }
  }
 */
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

          <Text h1 bold>
            Delete_vehicle
          </Text>
          <Block middle>
            <Input
              label="VIN Number"
              error={hasErrors("reg_num")}
              style={[styles.input, hasErrors("reg_num")]}
              defaultValue={this.state.reg_num}
              onChangeText={reg_num => this.setState({ reg_num: reg_num })}
            />
             <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Button gradient onPress={() => this.handledelete()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Delete_vehicle
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
