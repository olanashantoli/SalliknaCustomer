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

export default class Refilling_Fuel extends Component {
  
  constructor(props) {
 
    super(props)
 
    this.state = {
      key:'',
      plate_num: '',
      PickerValue:'',
      num:'',
      Email:'',
      errors: [],
      loading: false,
      latitude: null,
      longitude: null,   
      latitudeDelta: 0.0922,
     longitudeDelta: 0.0421,
     provider:'',
     dataSource:[],
     nearestPlace:'',
     output:[],
     index2:'',
     x:'',
     ServiceType:'Refilling Fuel',
     OrderType:'Refilling_Fuel',
     c:0
 
    }
 
  }


  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + this.s4() + this.s4();
}

s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}



check(){
    
  console.log("chekkk");
  fetch('http://192.168.43.137/Server/check.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      plate_num: this.state.plate_num,
      Email: global.Email,
      latitude: this.state.latitude,
      longitude:this.state.longitude,
      OrderType: this.state.OrderType,
  
    })
  
  }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson === 'repeat')
         {
         this.setState.c= (this.state.c) ++;
         console.log(this.state.c);
          this.fun();
             //Then open Profile activity and send user email to profile activity.
            // this.props.navigation.navigate('Second', { email: email });
           // this.props.navigation.navigate("Sallikna" ,{Email: email});
         //   Alert.alert(responseJson+'Find next');
         }
         else if (responseJson === 'Company still not accept or deny the requet'){
          console.log(" stillll");
           
          
         }
         else{
          Alert.alert(responseJson);
         }
  
        }).catch((error) => {
          console.error(error);
        });



}

storeprovider(){

  console.log("ssssssssssssss");
  fetch('http://192.168.43.137/Server/storeprovider.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  
      ProviderEmail:this.state.provider,
      plate_num: this.state.plate_num,
      Email: global.Email,
      latitude: this.state.latitude,
      longitude:this.state.longitude,
      OrderType: this.state.OrderType,
    
  
    })
  
  }).then((response) => response.json())
        .then((responseJson) => {
          console.log(   'responseJson');
          console.log(   responseJson);///////////////////////////
          this.setState({
            isLoading: false,
            dataSource: responseJson
          },function() {
                           // In this block you can do something with new state.
          });
          console.log("ddddddddddddddd");
      
          var i = 10000;//20sec
          while(i){
         i--;
         console.log("lop");
          }  
         
              
                  this.check();

        }).catch((error) => {
          console.error(error);
        });

}


 
shortest(){
  console.log("bbbbbbbbbbbbb");
   console.log("111111111111111111");
   var lan=[];
   var lon=[];
   var EMArr=[];
   var lat1=this.state.latitude*(Math.PI/180);;
   var lng1=this.state.longitude*(Math.PI/180);;
   var lat2;
   var lng2;
   var output=[];
   var lowestDis;
   var key;
   for (i = 0; i < this.state.dataSource.length; i++) {
   { this.state.dataSource.map((item,i ) => ( //key
     key=this.guid(),
   

     lan[i]=item.lat,
     lon[i]=item.lng,
    EMArr[i]=item.Email
   /////////////////////// undefine
 ))
 }}
 console.log(lan),
 console.log(lon),
 console.log(EMArr)

 for (i = 0; i < lon.length; i++) {
   //  console.log(lan[0]);
       lat2=lan[i]*(Math.PI/180);
       lng2=lon[i]*(Math.PI/180);

       var dlong = lng2 - lng1;
       var dlat = lat2 - lat1;
       var ans = Math.pow(Math.sin(dlat / 2), 2) +Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong / 2), 2);
       var ans2 = 2 * Math.asin(Math.sqrt(ans));
       var ans3 = ans2 * 6371;
       output[i]=ans3;

   }
  /////////////////////////////////////////// copy output array to temp array
 var temp=[];
 for (var i = 0; i < output.length; i++) {
      
          temp[i] = output[i];
       
  }
/////////////////////////////////////////// sort the array and take lowest value
output.sort(function(a, b){return a-b});
  lowestDis = output[0];

/////////////////////////////////////////// save the index of the lowest value to get the email value and it stored in EMArr[index]
  var index = 0;
  var value = output[this.state.c];
  for (var i = 0; i < temp.length; i++) {
      if (temp[i] ==value) {
          index = i;
      }
  }
   console.log(EMArr[index]);//
this.state.provider=EMArr[index];
  
   console.log(this.state.provider);

    this.storeprovider();
 }





fun() {

  console.log("sFFFFFFFFFFFFFFF");
  fetch('http://192.168.43.137/Server/funnn.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      
      ServiceType:this.state.ServiceType,
      plate_num: this.state.plate_num,
      Email: global.Email,
      latitude: this.state.latitude,
      longitude:this.state.longitude
    
  
    })
  
  }).then((response) => response.json())
        .then((responseJson) => {
          console.log(   'responseJson');
          console.log(   responseJson);///////////////////////////
          this.setState({
            isLoading: false,
            dataSource: responseJson
          },function() {
                
            
            // In this block you can do something with new state.
          });
          console.log("ddddddddddddddd");
      
          this.shortest();
  // Showing response message coming from server after inserting records.
         // Alert.alert(responseJson);
  
        }).catch((error) => {
          console.error(error);
        });

}


componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchId);
//  this.fun();
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
        Email: global.Email,
        latitude: this.state.latitude,
        longitude:this.state.longitude
       
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
    if(responseJson === 'request send  Successfully')
    {

        //Then open Profile activity and send user email to profile activity.
       // this.props.navigation.navigate('Second', { email: email });
       this.fun();
       Alert.alert(responseJson+" , Please Wait a minute");
    }
    else{

      Alert.alert(responseJson);
    }
    
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
              label=" 
              How many liters do you need ? "
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
		<Picker.Item label="Select fuel type  " value=""/>
		<Picker.Item label="* diesel" value="diesel" />
		<Picker.Item label="* gasoline" value="gasoline"/>
		</Picker>


            
         
           
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

