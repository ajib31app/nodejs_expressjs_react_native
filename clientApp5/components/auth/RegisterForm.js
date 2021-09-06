import React, {useState} from 'react';

import {
    Platform, 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity,
    StatusBar,
    Button,
    ActivityIndicator,
    Alert,
    Image} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import API from '../../service/Auth';
import GeneralUtility from '../../utility/GeneralUtility';
import Spinner from 'react-native-loading-spinner-overlay';
import Text from '../../components/text/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function RegisterForm(props) {
    const navigation = useNavigation();
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEncrypt,setIsEncrypt] = useState(true);

    
    const resetInput = ()=>{
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const register = async()=>{
      if(GeneralUtility.ValidatePassword(password)){
          const props = {
            username: username,
            email: email,
            password: password,
          }

          if(GeneralUtility.ValidateEmail(email)){
            setIsLoading(true);
            const response = await API.register(props);
            let statusCode = typeof response !='undefined' && response !=null && response !={} ? response.status : 0;
            if(statusCode==200){
              resetInput();
              Alert.alert(
                'Success',
                'Registrasi Successfully',
                [ 
                  {text: 'OK', onPress: () => {
                    setIsLoading(false);
                    
                  }},
                ],
                { cancelable: false }
              )
            }else{
              resetInput();
              Alert.alert(
                'Failed',
                response.message,
                [ 
                  {text: 'OK', onPress: () => {
                    setIsLoading(false);
                    
                  }},
                ],
                { cancelable: false }
              )
            }
          
          }else{
            Alert.alert(
              '',
              'Invalid email.',
              [ 
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }
            )
          }

      }else{
        Alert.alert(
          '',
          'Password must need more from 6 characters.',
          [ 
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
    }

    const validasi = ()=>{
      if(email==''){
        return false;
      }else if(username==''){
        return false;
      }else if(password==''){
        return false;
      }
      return true;
    }


    return(
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textContent={'Registering...'}
                textStyle={styles.spinnerTextStyle}
            />
            {/* <ActivityIndicator size="small" color="#0000ff" hidesWhenStopped={true} animating={isLoading}/> */}
            <View style={{
              flexDirection:'column', 
              width:'100%', 
              justifyContent:'center', 
              alignItems:'center',
              marginBottom:20
              }}>

                <Text h3 bold style={{color:'#434343'}}>
                  Register
                </Text>
                <View style={{flexDirection:'row', marginTop:5.5}}>
                  <Text h6 style={{justifyContent:'center', alignItems:'center',marginRight:2.5, color:'#434343'}}>
                    Already account?
                  </Text>
                  <TouchableOpacity 
                    title="Login"
                    onPress={()=> navigation.navigate('Login')}>
                    <Text h6 style={{justifyContent:'center', alignItems:'center', color:'#E0A526'}}>
                      Login here
                    </Text>
                  </TouchableOpacity>
                </View>
            </View>

            
            <TextInput style={styles.input}
                value={username}
                placeholder="Username"
                returnKeyType="next"
                placeholderTextColor="#DDDDDD"
                name="username"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text=>setUsername(text)}/>
   
            <TextInput style={styles.input}
                value={email}
                placeholder="Email"
                returnKeyType="next"
                placeholderTextColor="#DDDDDD"
                name="email"
                keyboardType="name-phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text=>setEmail(text)}/>
            
            <View style={styles.inputPassword}>
              <TextInput 
                    placeholder="Password"
                    returnKeyType="done"
                    secureTextEntry={isEncrypt}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    placeholderTextColor="#DDDDDD"
                    style={{flex:1, paddingHorizontal:20,backgroundColor:'#FFF',color:'#434343'}}
                    // ref={(input)=>this.passwordInput=input}
              />
              <View style={{justifyContent:'center',marginRight:10}}>
                <TouchableOpacity
                  onPress={()=>{
                    if(isEncrypt){
                      setIsEncrypt(false);
                    }else{
                      setIsEncrypt(true);
                    }
                  }}>
                  {isEncrypt ? 
                    <Image style={{width:wp('6%'), height:wp('5%')}} source={require('../../image/visibility.png')}/>:
                    <Image style={{width:wp('6%'), height:wp('5%')}} source={require('../../image/visibility_off.png')}/>
                  }
                </TouchableOpacity>
              </View>
            </View>

            
   

        
              {validasi() ? 
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={()=>register()}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity> : 
                <View style={styles.buttonContainerDisable}>
                  <Text style={styles.buttonText}>Submit</Text>
                </View>
              }

            <View 
                style={
                  {
                    flexDirection: 'column',
                    marginBottom:26,
                    marginTop:22,
                  }
                }>
              </View> 
        </View>
    )
    
}

const styles = StyleSheet.create({

  
    container:{
        width:wp('100%'),
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: hp('10%'),
        paddingTop:hp('5%'),
        backgroundColor:'#FAFAFA',
    },

    inputPassword:{
      backgroundColor:'#FFF',
      color:'#434343',
      borderRadius:10,
      marginBottom:8,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      flexDirection:'row',
      alignContent:'center',
      width:'100%',
      height:50
    }, 
    buttonContainer:{
        backgroundColor: '#E0A526',
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom:10
    },

    buttonContainerDisable:{
      backgroundColor: '#DDDDDD',
      paddingVertical: 10,
      borderRadius: 50,
      marginBottom:10
  },

    buttonStyle:{
      marginTop:10,
      paddingTop:15,
      paddingBottom:15,
      backgroundColor: '#2980b9',
      borderRadius:50,
      borderWidth: 1,
    },

    buttonText:{
        textAlign:'center',
        fontSize: 18,
        color: 'white'
    },

    input:{
      height: 50,
      backgroundColor:'#FFF',
      color:'#434343',
      borderRadius:10,
      marginBottom:8,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      paddingHorizontal: 20
    },

  
    buttonText:{
      textAlign:'center',
      fontSize: 18,
      color: 'white'
    },
  
    buttonTextSocial:{
      textAlign:'center',
      fontSize: 18,
      color: 'black',
      marginLeft:10
    },
    buttonContainerRegister:{
      flexDirection:'row',
      textAlign:'center',
      justifyContent:'center',
      fontSize: 18,
      marginTop:10,
    },
  
    buttonTextS:{
      color:'black'
    },
  
    textRegister:{
      color:'#FE5461'
    },
    spinnerTextStyle: {
      color: '#FFF',
      fontSize:14
    },
})
