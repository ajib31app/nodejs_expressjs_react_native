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
    Image,
    Dimensions,
    ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../../components/text/Text';

import API from '../../service/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GeneralUtility from '../../utility/GeneralUtility';
import Spinner from 'react-native-loading-spinner-overlay';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowPadding = 10;
const containerPadding = 10;

export default function LoginForm({route}) {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isEncrypt,setIsEncrypt] = useState(true);

    
  

    

    

    
    const loginTest = () => {
      navigation.navigate('MainActivity');
    }

    const login = ()=>{
      const props = {
        username:username,
        password:password
      }
      if(validation()){  
          setIsLoading(true);
          API.login(props).then((response)=>{
            console.log(JSON.stringify(response));
            setIsLoading(false);
            if(response.status == '200'){
              storeData(response.data)
            }else{
              Alert.alert(
                  'Gagal Login',
                  response.message,
                [ 
                  {text: 'Ok', onPress: () => setIsLoading(false)}
                ],
                { cancelable: false }
              )
            }
          });
      }else{
        alert("Complete form");
      }
      
    }

  

    const storeData = async (props) => {
      try {
        let role = "";
        console.log(">> "+props.roles[0]);

        if(props.roles.length == 1){
          role = props.roles[0];
        }
        
 

        let user_email = '';
        if (props.email != null) {
          user_email = props.email;
        }

        let user_id = props.id !=null && props.id !=0 ? props.id : 0;

        await AsyncStorage.setItem('token', props.token);
        await AsyncStorage.setItem('email', user_email);
        await AsyncStorage.setItem('role', role);
        await AsyncStorage.setItem('isUpdate', '1');
        await AsyncStorage.setItem('userId',user_id.toString());
        await AsyncStorage.setItem('lastRefreshToken', props.lastRefreshToken);

        setIsLoading(false);
        // // navigation.navigate('Akun');
        navigation.navigate('MainActivity');
      } catch (e) {
        console.log(e);
      }
    }

    const validation = ()=>{
      if(username==''){
        return false;
      }else if(password==''){
        return false
      }else{
        return true;
      }
    }
    
    return (
        <View style={styles.container}>
        {/* <HeaderNetral title={'Tester'}/> */}
            {isLoading ? 
              <Spinner
                visible={isLoading}
                textContent={'Sign in process...'}
                textStyle={styles.spinnerTextStyle}/>:null
            }
            <ScrollView>
              <View style={styles.content}>
                <View style={styles.containerItem}>
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text h3 bold style={{color:'#434343',marginBottom:25,paddingTop:hp('1%'),paddingBottom:hp('1%')}}>
                      Welcome
                    </Text>
                  </View>
                  <TextInput style={styles.input}
                    placeholder="Username"
                    returnKeyType="next"
                    placeholderTextColor="#DDDDDD"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={username}
                    onChangeText={(text)=>setUsername(text)}/>
                  <View style={styles.inputPassword}>
                    <TextInput 
                          placeholder="Password"
                          returnKeyType="go"
                          secureTextEntry={isEncrypt}
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={password}
                          onChangeText={(text)=>setPassword(text)}
                          placeholderTextColor="#DDDDDD"
                          style={{
                            flex:1, 
                            paddingHorizontal:20,
                            backgroundColor:'#FFF',
                            color:'#434343',
                            borderRadius:10,}}
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
                  {validation() ? 
                    <TouchableOpacity style={styles.buttonContainer}
                      onPress={()=>
                        login()
                      }>
                      <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>:
                    <View style={styles.buttonContainerDisable}>
                      <Text style={styles.buttonText}>Sign In</Text>
                    </View>
                  }

                <View 
                  style={
                    {
                      flexDirection: 'column',
                      marginBottom:26,
                      marginTop:22,
                      alignItems:'center'
                    }
                  }>
                    <View style={{
                      alignItems:'center',
                      flexDirection:'row'
                    }}>
                      <View style={{width:89,borderBottomColor: '#ADADAD',borderBottomWidth: 1,}}/>
                      <Text style={{marginHorizontal:12}}>
                        Or
                      </Text>
                      <View style={{width:89,borderBottomColor: '#ADADAD',borderBottomWidth: 1,}}/>
                    </View>
                </View>

  
                <View>

                  <TouchableOpacity style={styles.buttonContainer}
                      onPress={()=> navigation.navigate('Register')}>
                      <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>

                
                </View>
              </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

  containerTitle:{
    display:'flex',
    flexDirection:'row',
    paddingTop:5,
    paddingBottom:5,
    alignContent:"center",
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
  },

  textContainer:{
    justifyContent:'center'
  },

  text:{
    color:'#434343',
    marginTop:10,
    fontSize:10,
  },

  text2:{
    marginLeft:4,
    marginTop:10,
    color:"#E0A526",
    fontSize:10,
  },

  
    container: {
      display:'flex',
      flexDirection:'column',
      backgroundColor:'#FAFAFA',
    },
    content:{
        padding:containerPadding,
    },
    containerItem:{
        backgroundColor:'#FAFAFA',
        borderRadius:5,
        paddingTop:25,
        paddingLeft:windowPadding,
        paddingRight:windowPadding,
        paddingBottom:20,
        marginBottom:5,
        marginTop:10,
        // elevation:5,
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
    inputPassword:{
      color:'#434343',
      backgroundColor:'#FFF',
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

    buttonText:{
      textAlign:'center',
      fontSize: 18,
      color: 'white'
    },
    

    buttonContainerRegister:{
      flexDirection:'row',
      textAlign:'center',
      justifyContent:'center',
      fontSize: 18,
      marginTop:10,
    },
  
    buttonTextRegister:{
      color:'black'
    },
  
    textRegister:{
      color:'#E0A526'
    },
    spinnerTextStyle: {
      color: '#FFF',
      fontSize:14
    },
});
