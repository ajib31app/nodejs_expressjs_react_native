import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, Alert, Linking, Platform } from 'react-native';
import TabBottom from '../components/tab/TabBottom';
import { useNavigation, NavigationAction } from '@react-navigation/native';
import { version } from '../package.json';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width; 
const windowHeight = Dimensions.get('window').height;  

export default function MainActivity({route,navigation}) {
    navigation = useNavigation(); 
    return (
      <TabBottom />
      
    );
}

const styles = StyleSheet.create({

  floating:{ 
    position: 'absolute', 
    bottom: 10, 
    flexDirection:'row', 
    width:wp('45%'), 
    height:wp('10%'), 
    backgroundColor:'#0080FF',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    marginBottom:20,
    marginTop:20, 
    alignSelf:'center'
  },

  container: {
    width:windowWidth,
    height:windowHeight,
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems:"center",
    flexDirection:'column'
  },
  textinput:{
    width: 100,
    height: 50
  }
});
