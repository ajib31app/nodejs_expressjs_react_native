import React from 'react';
import { StyleSheet, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Text from '../../components/text/Text';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let marginHeader = 0;
if(Platform.OS == 'ios'){
  // statusBar = getStatusBarHeight();
  marginHeader = 5;
}

export default function HeaderNetral({title,navigation, titleClosed, titleAdd}) {
    navigation = useNavigation();
    return (
        <View style={styles.containerMain}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={()=>{
                        navigation.goBack()
                    }}>
                    <Image style={styles.logo} source={require('../../image/backgold.png')} resizeMode={'contain'}/>
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text h4 bold style={{color:'#434343'}}>{title}</Text>
                </View>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <Text h4 bold style={{color:'#E0A526'}}>{titleClosed}</Text>
                </TouchableOpacity>
               {/* <TouchableOpacity 
                    onPress={()=>{navigation.navigate('Login')}}>
                    <Image 
                        style={styles.menu} 
                        source={require('../../image/menu.png')} 
                        resizeMode="cover"/>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerMain: {
        height:hp('10%'),
        backgroundColor: '#FFFFFF',
        alignItems:"center",
        flexDirection:'column',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 5,
        marginBottom:marginHeader
    },
  
    header: {
        width:'100%',
        backgroundColor: '#FFFFFF',
        height:hp('10%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
   
    textField:{
      marginLeft:13,
      alignItems:"center",
      fontSize:12,
      color:'#000'
    },
  
    logo:{
      width:25,
      height:25,
      marginLeft:15,
    },
  
    titleContainer:{
      flex:1,
      height: 45, 
      width: '100%', 
      justifyContent:'center',
      paddingLeft:20
    },
    
    imageStyle:{
        width:20,
        height:20,
        marginLeft:20,
        marginRight:10
    },
    menu:{
        width:20,
        height:25,
        marginRight:10
    }
  });