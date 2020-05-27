//This is an example of Tab inside Navigation Drawer in React Native//
import React, { Component } from 'react';
//import react in our code.
import {  AppRegistry,StyleSheet, View, Text ,FlatList} from 'react-native';
// import all basic components
import  MapView  from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {NavigationEvents} from 'react-navigation';



//getCurrentPosition Example
export default class Home extends Component  {
  constructor(props) {
    super(props);
    this.onRegionChange=this.onRegionChange.bind(this);
    this.deg2Rad=this.deg2Rad.bind(this);
    this.pythagorasEquirectangular =this.pythagorasEquirectangular.bind(this);
    this.NearestCity=this.NearestCity.bind(this);
    this.retrieveData=this.retrieveData.bind(this);
    this.state = {
      Email:'',
        clinicNames:[],
        clinicName:'',
        clinics:[],
        nodata:false,//////////edited
        latitude:'',
        longitude:'',

      loading: true,
       error: null,
       region: {
       latitude: 32.3170623,
       longitude: 35.1901304,   
       latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
       }
    };
  }
  
  onRegionChange(region){
    this.setState({ region:region });
  }	

  
  deg2Rad (deg) {
    return deg * Math.PI / 180;
  }
  
  
pythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}

NearestCity(latitude, longitude) {
 
}

   componentDidMount() {
    //const { done }  ;
    this.retrieveData();

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
   
    return fetch('http://192.168.43.137/Server/Home-Cus.php', {
      method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
    
     ///   name: this.state.username,
        email: global.Email,
        latitude: this.state.latitude,
        longitude:this.state.longitude
       // Done :  global.Done,
    
     ////   password: this.state.password 
    
      })
    
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
         
          isLoading: false,
          dataSource: responseJson
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
      
  }
 
 
// data={ this.state.dataSource }
componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

retrieveData(){
  const { navigation } = this.props;  

  this.setState({
    Email:global.Email,
  });




}

  render() {
  
    //var y = global.LNG;
 

  
    return (

       <View style={styles.MainContainer }>
{/* <text> {'l :'+ x}</text>*/}


     {/*     <FlatList
         
         data={ this.state.dataSource }
         
      

           renderItem={({item}) => <View style={{flex:1, flexDirection: 'column'}} >

          
       
<Text style={styles.textViewContainer} >{'ID = ' + item.lat}</Text> 
<Text style={styles.textViewContainer} >{'ID = ' + item.lng}</Text> 
<Text style={styles.textViewContainer3} >{'/************'}</Text>
<Text style={styles.textViewContainer} >{'Customer Email : ' + item.CompanyName}</Text>



       
       
       
        
        </View>

        
           }
        
          
         keyExtractor={(item, index) => index}
         extraData={this.state}
        
        />  */}
         <MapView
    style={styles.map}
    showsUserLocation
    zoomEnabled={true}
    followsUserLocation={true}
    showsCompass={true}
    showsBuildings={true}
    showsTraffic={true}
    showsIndoors={true}
    initialRegion={this.state.region}
    
    >
  
         <Marker coordinate = {{latitude : 32.455 ,longitude:35.3}}
         pinColor = {"purple"} // any color
         title={"company x"}
         description={"BMW company"}/> 

         <Marker coordinate = {{latitude : 32.6 ,longitude:35.3}}
         pinColor = {"purple"} // any color
         title={"company y"}
         description={"for all vehicles"}/> 

        <Marker coordinate = {{latitude : 32 ,longitude:35.1}}
         pinColor = {"purple"} // any color
         title={"car workshop"}
         description={"for all vehicles"}/> 

         <Marker coordinate = {{latitude : 32.445 ,longitude:35.21}}
         pinColor = {"purple"} // any color
         title={"ola walaa co"}
         description={"for all vehicles"}/> 

          <Marker coordinate = {{latitude : 32.3 ,longitude:35.3}}
         pinColor = {"purple"} // any color
         title={" Petrol station"}
         description={""}/> 

        <Marker coordinate = {{latitude : 32 ,longitude:35.35}}
         pinColor = {"purple"} // any color
         title={"car workshop"}
         description={"for all vehicles"}/> 

          <Marker coordinate = {{latitude : 32.324 ,longitude:35.005}}
         pinColor = {"purple"} // any color
         title={"car workshop2"}
         description={"for all vehicles"}/> 

          <Marker coordinate = {{latitude : 32.4 ,longitude:35.35}}
         pinColor = {"purple"} // any color
         title={"car workshop44"}
         description={"for all vehicles"}/> 
 
    </MapView>  
     {/*  <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text> 
        
    {this.state.error ? <Text>Error: {this.state.error}</Text> : null}  */}
 
 {/* <MapView style={styles.map}
          initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0,
              longitudeDelta: 0.0,
          }}
        >
        <MapView.Marker
            coordinate={{latitude: this.state.latitude,
            longitude: this.state.longitude}}
            title={"title"}
            description={"description"}
         />
      </MapView> */}
   

  


{/*         {!this.state.nodata && this.state.dataSource.map((marker) => {
      return(
        <MapView.Marker
      coordinate={{
                      latitude: marker.lat,
                      longitude: marker.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                    title={marker.CompanyName}
    />
      )
    
  })} */}

      </View> 
    
    );
  }
}

//end get current location

/* 
const {width , height } = Dimensions.get ('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA* ASPECT_RATIO

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
initialPosition:{
latitude:0,
longitude:0,
latitudeDelta:0,
longitudeDelta:0
},

markerPosition:{
  latitude:0,
  longitude:0
}
    }
    }
  
  watchID: ?number = null 

  componentDidMount() {
navigator.geolocation.getCurrentPosition((position)=>{
  var lat = parseFloat(position.coords.latitude)
  var long = parseFloat(position.coords.longitude)

  var initialRegion = {
    latitude: lat ,
    longitude : long,
    latitudeDelta: LATTITUDE_DELTA,
    longitudeDelta: LONGTITUDE_DELTA
  }

  this.setState({initialPosition: initialRegion})
  this.setState({markerPosition: initialRegion})
},
(error) => alert(JSON.stringify(error)),
{enableHighAccuracy: true, timeout: 20000 , maximumAge: 10000})

this.watchID = navigator.geolocation.watchPosition((position)=>{
  var lat = parseFloat(position.coords.latitude)
  var long = parseFloat(position.coords.longitude)

  var lastRegion = {
    latitude: lat ,
    longitude : long,
    latitudeDelta: LATTITUDE_DELTA,
    longitudeDelta: LONGTITUDE_DELTA
  }
  this.setState({initialPosition: lastRegion})
  this.setState({markerPosition: lastRegion})


})


  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }
//83
render(){
  return (
    <View style={styles.MainContainer}>
    <MapView
    style={styles.map}
    initialRegion={this.state.initialPosition}
   // provider = {PROVIDER_DEFAULT}
    mapType="standard"
    zoomEnabled={true}
    pitchEnabled={true}
    showsUserLocation={true}
    followsUserLocation={true}
    showsCompass={true}
    showsBuildings={true}
    showsTraffic={true}
    showsIndoors={true}>
    
    <MapView.Marker
    coordinate={this.state.markerPosition}>
    <View style={styles.radius}>
    <View style={styles.marker}>
    </View>
    </View>
    </MapView.Marker>
    </MapView>
    </View>
  );


}
}
 */


     /*  isLoading: true,
      markers: [],
    };
  } */
 /*  componentDidMount() {
    this.fetchMarkerData();
}

  fetchMarkerData() {
    fetch('https://feeds.citibikenyc.com/stations/stations.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson.stationBeanList, 
        });
      })
      .catch((error) => {
        console.log(error);
      })} */
  //Screen2 Component
 /*  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Home </Text>
      </View>  ,
      <MapView
      style={{
        flex: 1
      }}
        showsUserLocation={true}  
          zoomEnabled={true}  
          zoomControlEnabled={true}  
      initialRegion={{
        latitude: 32.4646,
        longitude: 35.2939,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}>
   <Marker  
            coordinate={{ latitude: 32.4746, longitude: 35.2539}}  
            title={"olaaaaaaa"}  
            description={"Java Training Institute"}  
          />  
           <Marker  
            coordinate={{ latitude: 32.4646, longitude: 35.2939}}  
            title={"olaaaaaaa"}  
            description={"Java Training Institute"}  
          />  */ 
 /* 
    {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
     const coords = {
         latitude: marker.latitude,
         longitude: marker.longitude,
     };

     const metadata = `Status: ${marker.statusValue}`;

     return (
         <MapView.Marker
            key={index}
            coordinate={coords}
            title={marker.stationName}
            description={metadata}
         />
     );
  })}  */
  
  /*  </MapView>
    );
  }
} */

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 0,
    justifyContent: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

