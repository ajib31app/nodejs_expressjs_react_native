import React, { Component, useState, useEffect } from 'react';
import { SectionList, 
          StyleSheet, 
          View, 
          Image, 
          TextInput, 
          Button, 
          Platform, 
          ActivityIndicator,
          ScrollView,
          Alert,
          RefreshControl, 
          BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../service/Auth';
import { TouchableOpacity } from 'react-native-gesture-handler';


import Text from '../components/text/Text';
import HeaderNetral from '../components/home/HeaderNetral';
import Spinner from 'react-native-loading-spinner-overlay';
import GeneralUtility from '../utility/GeneralUtility';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';

async function getSession(){
  try {
    const token = await AsyncStorage.getItem('token')
    const email = await AsyncStorage.getItem('email')
    if(token !== null) {
      const session = {
        token:token,
        email:email
      }
      return session;
    }
  } catch(e) {
    // error reading value
    console.log(e);
  }
}

export default function UserProfile({navigation}){
  const [token,setToken] = useState('');
  const [session,setSession] = useState('');
  const [username, setUsername] = useState('-');
  const [email,setEmail] = useState();

  const [isLoading, setIsLoading] = useState(false);
  
  const [loadingMessage,setLoadingMessage] = useState('');
  const [refreshing,setRefreshing] = useState(false)



  const getProfileData = async()=>{
    setLoadingMessage("Getting data...")
    setIsLoading(true);
    API.getProfile().then((response)=>{
      console.log(JSON.stringify(response));
      setIsLoading(false);
      setEmail(response.data.email);
      setUsername(response.data.username);
      
    
    })
  }



  const updateProfile = async()=>{
    
  }

  const validasi = ()=>{
    if(username=='' || username =='-'){
      return false;
    }else if(email==''){
      return false;
    }else{
      return true;
    }
  }


  const changePicture = ()=>{
    Alert.alert(
      '',
      'Pilih gambar',
      [ 
        {text: 'Galeri', onPress: () =>browseFromGallery()},
        {text: 'Kamera', onPress: () =>takePicture()},
      ],
      { cancelable: true }
    )
  }

  



  

  const onRefresh = async()=>{
    getProfileData()
  }

  useState(()=>{
    getProfileData();
  });

  const backAction = ()=>{
      navigation.goBack();
      return true
  }

  useEffect(()=>{
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
  },[])

  return(
    <SafeAreaView style={{flex:1, backgroundColor:'#FAFAFA'}} forceInset={{ top: "always", bottom: "always" }}>
      <View style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={loadingMessage}
          textStyle={styles.spinnerTextStyle}
        />
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}/>
          }>
          <View style={styles.content}>
            <View style={styles.containerItem}>
              <View style={styles.containerInput}>
                <View style={styles.containerItemInput}>
                  <Text h5 bold style={styles.title}>Username</Text>
                  <TextInput style={styles.input}
                    placeholder="Username"
                    returnKeyType="next"
                    placeholderTextColor="#DDDDDD"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={username}
                    onChangeText={(text)=>setUsername(text)}/>
                </View>

                <View style={styles.containerItemInput}>
                  <Text h5 bold style={styles.title}>Email</Text>
                  <TextInput style={styles.input}
                    placeholder="Email"
                    returnKeyType="next"
                    placeholderTextColor="#DDDDDD"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(text)=>setEmail(text)}/>
                </View>
                
                <View style={styles.containerItemInput}>
                  {validasi() ? 
                    <TouchableOpacity
                      onPress={()=>{
                        updateProfile();
                      }}
                      style={styles.btnSave}>
                      <Text h4 medium style={{color:'#FFF'}}>Simpan</Text>
                    </TouchableOpacity>:
                    <View
                      style={styles.btnSaveDisable}>
                      <Text h4 medium style={{color:'#FFF'}}>Simpan</Text>
                    </View>
                  }
                  
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
    
  )
  
}

const styles = StyleSheet.create({
  // container: {
  //   flex:1,
  //   display:'flex',
  //   flexDirection:'column',
  //   padding: 20,
  //   backgroundColor: 'rgb(32, 53, 70)',
  // },

  container: {
    display:'flex',
    flexDirection:'column',
    backgroundColor:'#F8F8F8',
    flex:1
  },
  content:{
    padding:10,
    // backgroundColor:'#00FF00'
  },
  containerItem:{
    backgroundColor:'#FFF',
    borderRadius:5,
    paddingTop:hp('4%'),
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    paddingBottom:hp('4%'),
    elevation:5,
    // for ios
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 3,
  },
  input:{
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'#FFF',
    marginBottom: 10,
    borderRadius: 50,
    paddingHorizontal: 20
  },
  touchable:{
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'#FFF',
    marginBottom: 10,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical:12,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-start'
  },
  flex:{
    flex:1
  },
  buttonContainer:{
      backgroundColor: '#2980b9',
      paddingVertical: 10,
      borderRadius: 50,
      marginBottom:10
  },

  buttonText:{
    textAlign:'center',
    fontSize: 18,
    color: 'white'
  },

  radioContainer:{
    display:'flex',
    flexDirection:'row'
  },

  radioItemContainer:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    width:wp('30%'),
    justifyContent:'center',
    alignItems:'center'
  },

  radioText:{
    color:'#313131',
    marginLeft:10
  },

  containerImage:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'flex-start',
    marginBottom:hp('5%')
  },
  containerInput:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginTop:hp('5%')
  },
  name:{
    marginTop:10,
    color:"#E0A526"
  },
  button:{
    height: hp('5%'), 
    width:wp('37%'),
    borderWidth: 2, 
    borderRadius: 25,  
    marginLeft:7,
    fontSize: 8,
    borderColor:'#E0A526',
    alignItems:'center',
    justifyContent:'center',
    margin:10
  },
  textButton:{
    alignItems:"center",
    color:'#E0A526',
    margin:2
  },
  textDesc:{
    fontSize:10,
    color:'#313131'
  },
  
  title:{
    color:'#313131',
    marginBottom:5
  },
  containerItemInput:{
    display:'flex',
    flexDirection:'column',
    width:'100%',
    marginBottom:hp('3%')
  },
  input:{
    height: hp('8%'),
    width:'100%',
    backgroundColor:'#FFF',
    color:'#434343',
    borderRadius:5,
    marginBottom:8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingHorizontal: 20
  },
  inputDisable:{
    height: hp('8%'),
    width:'100%',
    backgroundColor:'#DDDDDD',
    borderRadius:5,
    marginBottom:8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingHorizontal: 20,
    justifyContent:'center'
  },
  inputDate:{
    height: hp('8%'),
    width:'100%',
    backgroundColor:'#FFF',
    color:'#A7A7A7',
    borderRadius:5,
    marginBottom:8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingHorizontal: 20,
    justifyContent:'center'
  },
  textDate:{
    color:'#A7A7A7'
  },
  btnSave:{
    height: hp('8%'), 
    width:'100%',
    borderRadius: 25,  
    fontSize: 8,
    backgroundColor:'#E0A526',
    alignItems:'center',
    justifyContent:'center',
    marginTop:5,
    marginBottom:5
  },
  btnSaveDisable:{
    height: hp('8%'), 
    width:'100%',
    borderRadius: 25,  
    fontSize: 8,
    backgroundColor:'#DDDDDD',
    alignItems:'center',
    justifyContent:'center',
    marginTop:5,
    marginBottom:5
  },
  btnKembali:{
    height: hp('8%'), 
    width:'100%',
    borderWidth: 2, 
    borderRadius: 25, 
    fontSize: 8,
    borderColor:'#E0A526',
    alignItems:'center',
    justifyContent:'center',
    marginTop:5,
    marginBottom:5
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize:14
  },
})
