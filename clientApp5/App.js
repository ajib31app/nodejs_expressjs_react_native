import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { AppRegistry, Platform, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { navigationRef, isMountedRef } from './RootNavigation';
import SplashScreen from './screens/SplashScreen';
import Register from './screens/Register';
import Login from './screens/Login';
import MainActivity from './screens/MainActivity';
import UserProfile from './screens/UserProfile';




const Stack = createStackNavigator();

export default function App() {
  return(
    <AppData/>
  )
}

function AppData() {


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={
              {
                title: 'SplashScreen',
                headerShown: false
              }
            }
          />

          <Stack.Screen 
            name="Login" 
            component={Login}
            options={
              {
                title: 'Login',
                headerShown: false
              
              }
            } 
          />

         <Stack.Screen
            name="MainActivity"
            component={MainActivity}
            options={
              {
                title: 'MainActivity',
                headerShown: false
              }
            }
          />

          <Stack.Screen 
            name="UserProfile" 
            component={UserProfile}
            options={
              {
                title: 'UserProfile',
                headerShown: false
              }
            } 
          />

          <Stack.Screen 
            name="Register" 
            component={Register}
            options={
              {
                title: 'Register',
                headerShown: false
              }
            } 
          />


    

      

         

    
      </Stack.Navigator>
    </NavigationContainer>
  );
}