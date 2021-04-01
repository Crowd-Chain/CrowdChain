//By the CrowdChain Team, 2021

//IMPORTS AND REQUIRES

//REACT IMPORTS
import React, { useEffect, useState, useRef} from 'react';
import {View, Text,TextInput, Button, StyleSheet, ScrollView, Alert, Modal, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
//SUPABASE IMPORTS
//import { createClient } from '@supabase/supabase-js';

//const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
import {supabase} from './Supabase.js';

//MODULE IMPORTS
import Navig from "../Nav";


//////////////////
//MAIN
//////////////////

const Report = ({reports,setReports}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType,setType] = useState(0);
  var radio_props = [
    {label: 'sorun', value: 0 },
    {label: 'çözüm', value: 1 }
  ];
  //Navig instance for geolocation
  const navig = new Navig();
  //Geolocation array => [longitude, latitude, timestamp]
  const geoLoc = navig.getLocation();                                        //Location doesn't update until user clicks to allow location services button
             



  const [errorText, setError] = useState("");

  const [EventCategories, setEventCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [Events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  //const eventTypes = {"doğal afetler": "101", "yangın": "102", "sosyal anket":"103"};


  const addReport = async () => {

   //if selected item is "seçiniz", user cannot submit report.
   if (!selectedEvent){
     return;
   }

    const { data: report, error } = await supabase
    .from('TestReports')
    .insert({ CODE: selectedEvent, LAT: geoLoc[1], LON: geoLoc[0]})
    .single();
    if (error) setError(error.message);
    else {
        setReports([report, ...reports]);
        setError(null);
  
    }
    setSelectedCategory(null)
    setSelectedEvent(null)
    setModalVisible(!modalVisible)
  };


useEffect(() => {
    fetchMainCategories().catch(console.error);
},[]);

useEffect(() => {
    fetchEvents().catch(console.error);
},[selectedCategory,selectedType]);


  
  const fetchMainCategories = async () => {
    
    let { data: EventCategories, error } = await supabase
          .from('EventCategories')
          .select("*")
          // Filters
          .eq('ParentCode', '0')
          if (error) console.log("error", error);
          else setEventCategories(EventCategories);
  };

  const fetchEvents = async () => {
    
    let { data: Events, error } = await supabase
          .from('EventCategories')
          .select("*")
          // Filters
          .eq('ParentCode', selectedCategory)
          .eq('Type', selectedType)
          if (error) console.log("error", error);
          else setEvents(Events);
  }; 

  const closeReport = () => {
    setSelectedCategory(null)
    setSelectedEvent(null)
    setModalVisible(!modalVisible)
  }
  

    return (
      <View style={styles.container}> 
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
      <View style={styles.centeredView}>
      <View style={styles.modalContainer}>
    
        <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => closeReport()}>
              <Text style={styles.closeButtonText}>X</Text>
              
         </Pressable> 
      
            <View style={styles.reportWrapper}>
                
                <Text style={styles.header}>Report</Text>
                
                <Picker style={styles.picker}
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedCategory(itemValue)
                    }>
                      <Picker.Item label="Seçiniz" value="" />  
                    {EventCategories.map((EventCategory) => (
                         <Picker.Item label={EventCategory.Child} value={EventCategory.ChildCode} /> 
                    ))}
                   
                </Picker>
                <RadioForm
                    style = {styles.radioButtons}
                    labelStyle = {styles.radioButtonLabels}
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => {setType(value)}}
                    formHorizontal={true}
                    buttonColor={'#662EDD'}
                    selectedButtonColor={'#662EDD'}
                />
                  
                <Picker style={styles.picker}
                    selectedValue={selectedEvent}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedEvent(itemValue)
                    }>
                      <Picker.Item label="Seçiniz" value="" />  
                    {Events.map((Event) => (
                         <Picker.Item label={Event.Child} value={Event.ChildCode} /> 
                    ))}
                   
                </Picker>
               
                {/* <TextInput placeholder="Reporter" style={styles.input}></TextInput> */}
                
                <Button title="submit" onPress={addReport} style={styles.btn} color="#662EDD"></Button>
            </View>
               
      </View> 
      </View>

      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Report</Text>
      </Pressable>
    </View>
     
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 99999,
    left: 15,
    top: 100
  },
  modalContainer:{
    flexDirection: "column",
    backgroundColor: "#DEDEDE",
    width: "fit-content",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(100,100,100,0.75)",
    width: "100%"
  },
  reportWrapper: {
    paddingHorizontal: 50,
    paddingBottom: 50
  },
  scrollview: {
    height: 250
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center"
  },
  reports: {
    fontSize: 14
  },
  input: {
    marginBottom: 20,
    fontSize: 16,
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#EDEDED'
  },
  picker: {
    marginBottom: 20,
    fontSize: 16,
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#EDEDED'
  },
  radioButtons: {
    marginBottom: 20,
    marginHorizontal: 20
  },
  radioButtonLabels: {
    marginRight: 20,
    height: "100%",
    marginVertical: "auto"
  },
  button: {
    padding: 10,
    width: "fit-content",
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#616161",
  },
  buttonClose: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "#616161",
    fontWeight: "bold",
    fontSize: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
  });

export default Report;