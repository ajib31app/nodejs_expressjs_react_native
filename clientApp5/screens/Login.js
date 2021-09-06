import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Button, Image, Dimensions} from 'react-native';
import LoginForm from '../components/auth/LoginForm';
import HeaderNetral from '../components/home/HeaderNetral';

import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default function Login({route,navigation}) {
    // const { name } = route.params;
    // console.log(name);
    return (
      <SafeAreaView style={{flex:1, backgroundColor:'#FAFAFA'}} forceInset={{ top: "always", bottom: "always" }}>
        <View style={styles.container}> 
          <HeaderNetral title={'Login'}/>
          <ScrollView>
            <View style={{flexDirection:'column',justifyContent:'center'}}>
              <LoginForm/>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      
    );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      width:'100%',
      backgroundColor: '#FAFAFA',
      flexDirection: 'column',
    },
})

