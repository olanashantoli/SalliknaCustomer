import React, { Component } from "react";
import {
  
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  ScrollView,
  AsyncStorage
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";


export default class Profile extends Component {
 
  constructor(props) {
 
    super(props)
 
    this.state = {
 
  //    username: '',
      email: '',
      mobile_phone:global.Phone,
      password: '',
      confirm_password: '',
    
      errors: [],
      loading: false
 
    }
 
  }
  

    ///////////////
   /*  componentDidMount(){
      this._loadInitalState().done();
    }

    _loadInitalState=async()=>{
      var value = await AsyncStorage.getItem('email');
      if(value!== null){
        this.setState({email:value})
      }
    } */
  
   // onPress = gender => this.setState({ gender });
    handleProfile() {
      const { navigation } = this.props;
      if(this.state.password == this.state.confirm_password){
    

      fetch('http://192.168.43.137/Server/profile.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      
       ///   name: this.state.username,
      
          email: global.Email,
      
          password: this.state.password,
  
          phone:this.state.mobile_phone
      
        })
      
      }).then((response) => response.json())
            .then((responseJson) => {
      
      // Showing response message coming from server after inserting records.
              Alert.alert(responseJson);
      
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
          else{
            Alert.alert(
              "eror : paswword dont match",
              "Please check password.",
              [{ text: "Try again" }],
              { cancelable: false }
            );
          }
          
          }

      /*     
      const { username,email, mobile_phone, password, confirm_password } = this.state;
      const errors = [];
  
     
  
      Keyboard.dismiss();
      this.setState({ loading: true });
  
      // check with backend API or with some static data
      if (!email) errors.push("email");
      if (!username) errors.push("username");
      if (!password) errors.push("password");
      if (!confirm_password) errors.push("confirm_password");
      if (!mobile_phone) errors.push("mobile_phone");
     
  
      this.setState({ errors, loading: false });
  

      fetch('http://192.168.100.113:3000/cusomerEDIT', {
        method :'PUT',
  
         headers:{
          'Accept':'application/json',
          'Content-Type ': 'application/json',
        },  
         body:JSON.stringify({
           ID:"",
           Name: this.state.username,
          Email: this.state.email,
          Password: this.state.password,
          Phone: this.mobile_phone,
          CustomerVehicles:"",
        }) 
    })
          .then(response => response.json())
         
          .then((res)=>{
            if (res.success===true){
              var email= res.message;
              AsyncStorage.setItem('email',email);
              console.log("sssssss");
              navigation.navigate("Profile");
  
            }
            else{
             console.log("fffffff");
             Alert. alert(res.message);
            }
          })
  .done();
      

      if (!errors.length) {
  
        Alert.alert(
          "Success!",
          "Your informations has been changed",
          [
            {
              text: "ok",
              onPress: () => {
                navigation.navigate("Profile");
              }
            }
          ],
          { cancelable: false }
        );
      }
    } */
  
    render() {
      const { navigation } = this.props;
      const { loading, errors } = this.state;
      const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
     
    
      return (
     
        <KeyboardAvoidingView style={styles.signup} behavior="padding">
       
          <Block padding={[0, theme.sizes.base * 2]}>
          <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Text h1 bold>
              Edit Profile Information
            </Text>
            <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Block middle>
            <ScrollView>
           {/*  <Input
                label="Username"
                error={hasErrors("username")}
                style={[styles.input, hasErrors("username")]}
                defaultValue={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              /> */}
  <Text style = {styles.TextComponentStyle}> Welcome  { global.UserName } </Text>
  <Text style = {styles.TextComponentStyle}> Your Email : { global.Email } </Text>
           {/*   <Input
                email
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={ global.Email}
                onChangeText={email => this.setState({ email: email })}
              /> */}
              <Input
              
              label="mobile_phone"
              error={hasErrors("mobile_phone")}
              style={[styles.input, hasErrors("mobile_phone")]}
              defaultValue={this.state.mobile_phone}
              onChangeText={phone => this.setState({ mobile_phone: phone })}
            /> 
              <Input
                secure
                label="Password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={password => this.setState({ password: password })}
              />
               <Input
                secure
                label="confirm_password"
                error={hasErrors("confirm_password")}
                style={[styles.input, hasErrors("confirm_password")]}
                defaultValue={this.state.confirm_password}
                onChangeText={confirm_password => this.setState({ confirm_password: confirm_password })}
              />
                <Text bold white center>
             {"\n"} {"\n"}
                </Text>

           
              <Button gradient onPress={() => this.handleProfile()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                   Save Changes
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
    
      );
    }
  
  }
  
  
  const styles = StyleSheet.create({
    signup: {
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
    },
   
    TextComponentStyle: {
      fontSize: 20,
     color: "#000",
    // textAlign: 'center', 
     marginBottom: 15
    }

  });
  