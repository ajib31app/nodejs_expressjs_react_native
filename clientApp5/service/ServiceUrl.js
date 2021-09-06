import AsyncStorage from '@react-native-async-storage/async-storage';
import Endpoint from '../service/Config';

const getBaseUrl = async () => {
    let result = await AsyncStorage.getItem('baseUrl');
    console.log("baseUrl: "+result);
    return result;
}

const getDefaultBaseUrl = async () => {
    let result = await AsyncStorage.getItem('defaultBaseUrl');
    console.log("defaultBaseUrl: "+result);
    return result;
}

const getTestAccount = async()=>{
    let result = await AsyncStorage.getItem('testAccounts');
    if(typeof result != 'undefined' && result!=null){
        return JSON.parse(result);
    }else{
        return [];
    }
}



const getRequestUrl = async(endpoint)=>{
    let baseUrl = Endpoint.baseUrl;
    let url = baseUrl+endpoint;
    return url;
}

const getRequestUrlAuth = async(endpoint,account)=>{ 
    let baseUrl = Endpoint.baseUrl;
    let url = baseUrl+endpoint;
    return url;
}


const ServiceUrl = {
    getRequestUrl,
    getRequestUrlAuth
}

export default ServiceUrl