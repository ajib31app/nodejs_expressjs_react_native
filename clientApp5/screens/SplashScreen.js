import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions, Image } from 'react-native';
import Text from '../components/text/Text'; 
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, StackActions} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GeneralUtility from '../utility/GeneralUtility';


const windowPadding = 0;
const containerPadding = 0;

export default function SplashScreen({route,navigation}) {
    const [background,setBackground] = useState('');
    const resetAction = StackActions.replace('MainActivity');

    const showMainPage = ()=>{
        setTimeout(function(){
            navigation.dispatch(resetAction);
        },2000)
    }

    

    useState(()=>{
        showMainPage();
    })

    return (
        <View style={styles.container}>
            <ScrollView>
              <View style={styles.content}>
                <View style={styles.containerItem}>
                    {background!='' ? 
                        <Image style={{height:hp('100%'), width:wp('100%')}} source={{uri:background}} resizeMode={'cover'}/>
                        :
                        <Image style={{height:hp('100%'), width:wp('100%')}} source={require('../image/backgroundmotif.jpg')} resizeMode={'cover'}/>
                    }
                    <Image style={{height:wp('40%'), width:wp('40%'), position:'absolute'}} source={require('../image/logo.png')} resizeMode={'cover'}/>
                    <Text h4 bold style={{position:'absolute', paddingTop:hp('75%'), color:'#434343'}}>Assesment Test Code</Text>
                    <Text h5 bold style={{position:'absolute', paddingTop:hp('82%'), color:'#0080FF'}}>1.1.1</Text>
                </View>
              </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      display:'flex',
      flexDirection:'column',
      backgroundColor:'#F8F8F8',
      flex:1
    },
    content:{
        padding:containerPadding,
    },
    containerItem:{
        backgroundColor:'#FFF',
        paddingLeft:windowPadding,
        paddingRight:windowPadding,
        flex:1,
        height:hp('100%'),
        width:wp('100%'),
        justifyContent:'center',
        alignItems:'center'
    },
  });
