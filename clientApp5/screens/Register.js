import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import RegisterForm from '../components/auth/RegisterForm'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import HeaderNetral from '../components/home/HeaderNetral';
import { SafeAreaView } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function Register({route,navigation}) {
    let params = typeof route !='undefined' ? route.params : null;
    let isPhoneRegistration = params != null ? params.isPhoneRegistration : false;
    let phoneNumber = params != null ? params.phoneNumber : '';
    let title = params != null ? params.title : 'Register';
    let email = params != null ? params.email : '';
    let isEmailRegistration = params !=null ? params.isEmailRegistration : false;
    // const { name } = route.params;
    // console.log(name);
    return (
      <SafeAreaView style={{flex:1}} forceInset={{ top: "always", bottom: "never" }}>
        <View style={styles.container}>
          <HeaderNetral title={title}/>
          <ScrollView
            showsVerticalScrollIndicator={false}>
            <RegisterForm isPhoneRegistration={isPhoneRegistration} phoneNumber={phoneNumber} email={email} isEmailRegistration={isEmailRegistration}/>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
