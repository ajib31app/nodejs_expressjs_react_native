import API from '../service/Auth';
import GeneralUtility from '../utility/GeneralUtility';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getHeader = async()=>{
    let headers = {
        'Accept':'application/json',
        'Content-Type': 'application/json'
    }
    console.log("headers "+JSON.stringify(headers));
    return headers;
}

const getSecureHeader = async()=>{
    // let token1 = await AsyncStorage.getItem('token');
    // console.log("token1 "+token1);

    let session = await API.getSession();
    let fingerprint = await GeneralUtility.GetFingerprint();
    let token = '';
    if(session!=null){
        token = session.token;
    }
    // console.log("token: "+token);
     
    let headers = {
        'Accept':'application/json',
        'Content-Type': 'application/json', 
        'x-access-token': token,
        'Fingerprint':fingerprint
    }
    return headers;
}
 
 

const SecurityService = {
    getHeader,
    getSecureHeader
}

export default SecurityService