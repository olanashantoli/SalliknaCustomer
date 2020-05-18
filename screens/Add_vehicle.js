import React, { Component } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  ScrollView
} from "react-native";
import {CheckBox } from 'react-native-elements';
import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";



export default class Add_vehicle extends Component {
 
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      type: '',
      model: '',
      year:'',
      plate: '',
      regnum: '',
      Email:'',
      errors: [],
      loading: false
 
    }
 
  }

 
  handleAdd_vehicle() {
    const { navigation } = this.props;
    fetch('http://192.168.43.137/Server/AddVehicle.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: global.Email,
        type: this.state.type,
    
        model: this.state.model,

        year:this.state.year,

        plate:this.state.plate,

        regnum: this.state.regnum

       
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });
        }

    /*     
    const { type,model, year, plate, reg } = this.state;
    const errors = [];

   

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!type) errors.push("type");
    if (!model) errors.push("model");
    if (!year) errors.push("year");
    if (!plate) errors.push("plate");
    if (!reg) errors.push("reg");
   

    this.setState({ errors, loading: false });

    fetch('http://192.168.100.113:3000/customervehiclesADD', {
      method :'POST',

       headers:{
        'Accept':'application/json',
        'Content-Type ': 'application/json',
      },  
       body:JSON.stringify({
       
        VehicleType: this.state.type,
        VehicleModel: this.state.model,
        YearOfManufacture: this.state.year,
        PlateNumber: this.plate,
        RegistrationNumber:this.reg,
      }) 
  })
        .then(response => response.json())
       
        .then((res)=>{
          if (res.success===true){
            var email= res.message;
            AsyncStorage.setItem('email',email);
            console.log("sssssss");
            //navigation.navigate("Login");////for test put it  profile insted of sallikna

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
        "Your account has been created",
        [
          {
            text: "Continue",
          
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
   
      <KeyboardAvoidingView style={styles.Add_vehicle} behavior="padding">
     
        <Block padding={[0, theme.sizes.base * 2]}>
        <ScrollView>
        <Text bold white center>
             {"\n"} {"\n"}
                </Text>

          <Text h1 bold>
            Add_vehicle
          </Text>
          <Text bold white center>
             {"\n"} {"\n"}
                </Text>

          <Block middle>
       
          <Input
              placeholder="ex:Saloon"
              label="Vehicle Type"
              error={hasErrors("type")}
              style={[styles.input, hasErrors("type")]}
              defaultValue={this.state.type}
              onChangeText={type => this.setState({ type: type })}
            />

            <Input
              email
              label=" Vehicle Model"
              error={hasErrors("model")}
              style={[styles.input, hasErrors("model")]}
              defaultValue={this.state.model}
              onChangeText={model => this.setState({ model: model })}
            />
            <Input
            
            label="Year Of Manufacture"
            error={hasErrors("year")}
            style={[styles.input, hasErrors("year")]}
            defaultValue={this.state.year}
            onChangeText={year => this.setState({ year: year })}
          /> 
            <Input
             
              label="Plate Number"
              error={hasErrors("plate")}
              style={[styles.input, hasErrors("plate")]}
              defaultValue={this.state.plate}
              onChangeText={plate => this.setState({ plate: plate })}
            />
             <Input
             
              label="VIN Number"
              error={hasErrors("regnum")}
              style={[styles.input, hasErrors("regnum")]}
              defaultValue={this.state.regnum}
              onChangeText={regnum => this.setState({ regnum: regnum })}
            />
            
            <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Button gradient onPress={() => this.handleAdd_vehicle()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Add_vehicle
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
  
    );
  }
}



const styles = StyleSheet.create({
  Add_vehicle: {
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
 
});
