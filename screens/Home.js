//This is an example of Tab inside Navigation Drawer in React Native//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
// import all basic components
import  MapView  from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
    };
  }
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
  render() {
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
          />  
 {/* 
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
  })}  */}
  
   </MapView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});
