//REACT IMPORTS
import React, { useEffect, useRef, useState} from 'react';
import {View, Text,TextInput, Button, StyleSheet, requireNativeComponent, TouchableNativeFeedback, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import Navig from "./Nav";
import { Marker } from 'react-native-maps';
//Navig instance for geolocation
const navig = new Navig();
//Geolocation array => [longitude, latitude, timestamp]
const geoLoc = navig.getLocation();                                        //Location doesn't update until user clicks to allow location services button
           
const MapEditor = ({points}) => {
        
return (
  
  <MapView
    style = {styles.mapEditor}
    loadingEnabled = {true}
    region={{
      latitude: geoLoc[1],
      longitude: geoLoc[0],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
     {points.map((point) => (
    <Marker
      key={point.id}
      coordinate={[point.LAT,point.LON]}
      title={point.CODE}
      description={point.CODE}
    />
  ))}
  </MapView>

);
};

const styles = StyleSheet.create({
  mapEditor: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: "relative"
  }
});

export default MapEditor;
