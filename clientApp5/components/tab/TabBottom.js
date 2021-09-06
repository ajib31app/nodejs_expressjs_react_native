import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../screens/Home';
import UserProfile from '../../screens/UserProfile';
// import UserProfile from '../../screens/Profile_V2/UserProfile_2';


import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';

 
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <SafeAreaView style={{flex:1,}} forceInset={{ top: "always", bottom: "never" }}>
      <Tab.Navigator style={styles.navigatorTab}
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#E0A526',
          inactiveTintColor: 'gray',
          tabStyle:{
            borderTopLeftRadius:21, 
            borderTopRightRadius:21,
            // position:'relative',
            bottom: 0,
            paddingTop:10,
            // padding:5,
            height: 45,
            // zIndex: 8,
            alignItems:'center'
          }
        }}
      >
        <Tab.Screen
          name="Feed"
          component={Home}
          Icon="ios-home"
          options={{
            tabBarLabel: 'Sales',
            tabBarIcon: ({ focused }) => {
              const image = focused
              ? require('../../image/icon_home_tab/list_active.png')
              : require('../../image/icon_home_tab/list_inactive.png')
              return (
                  <Image
                      source={image}
                      style={{width:wp('5%'),height:(wp('5%')),resizeMode:'contain'}}
                  />
              )
          }
          }}
        />
     
        
        
    
        <Tab.Screen
          name="Akun"
          component={UserProfile}
          options={{
            tabBarLabel: 'Akun',
            tabBarIcon: ({ focused }) => {
              const image = focused
              ? require('../../image/icon_home_tab/akun_active.png')
              : require('../../image/icon_home_tab/akun_inactive.png')
              return (
                  <Image
                      source={image}
                      style={{width:wp('5%'),height:(wp('5%')),resizeMode:'contain'}}
                  />
              )
          }
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
    
  );
}

export default function TabBottom() {
  return (
    <MyTabs/>
  );
}

const styles = StyleSheet.create({
  container:{
    // flex: 1, 
    justifyContent: 'center',
  },

  navigatorTab:{
   borderRadius:10
  },
  navigator:{
    borderRadius:50,
    // marginBottom:10,
  },
  
})

