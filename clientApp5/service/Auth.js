import Endpoint from '../service/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServiceUrl from '../service/ServiceUrl';
import ConnectionUtility from '../utility/ConnectionUtility';
import GeneralUtility from '../utility/GeneralUtility';
import SecurityService from '../service/SecurityService';

// delay refresh token in minutes:
const tokenRefreshDelay = 45;
const tokenRefreshHour = 0;

const getSession = async()=>{
  try {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    const isUpdate = await AsyncStorage.getItem('isUpdate');
    const name = await AsyncStorage.getItem('name');
    const role = await AsyncStorage.getItem('role');
    const userId = await AsyncStorage.getItem('userId');
    const lastRefreshToken = await AsyncStorage.getItem("lastRefreshToken");
    if(token !== null) {
      const session = {
        token:token,
        email:email,
        isUpdate:isUpdate, 
        name:name,
        type:role,
        userId:userId,
        lastRefreshToken:lastRefreshToken
      }
      let validToken = await validateToken(session);
      if(validToken!=""){
        session.token = validToken;
      }
      return session;
    }else{
      return null;
    }
  } catch(e) {
    console.log(e);
  }
}

const login = async(props)=>{
    const formData = new FormData();
    formData.append('username', props.username);
    formData.append('password', props.password);
    
    let url = await ServiceUrl.getRequestUrlAuth(Endpoint.login, props.username);
    console.log('url login >> '+url);

    let headers = await SecurityService.getHeader();

    const param = JSON.stringify({
        "username":props.username,
        "password":props.password
    });

    

    return fetch(url,{
      method: 'POST',
      headers:headers,
      body: param
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        let message = responseJson.message;
        console.log(">>"+JSON.stringify(responseJson));
        if(status==200){
          return responseJson;
        }else{
            return ConnectionUtility.GenerateErrorMessage(status,message)
        }
      })
      .catch((error) => {
          console.error(error);
          return ConnectionUtility.exception();
      });
}


const register = async(props)=>{
    const param = JSON.stringify({
        "username":props.username,
        "email":props.email,
        "password":props.password
    });

    let url = await ServiceUrl.getRequestUrlAuth(Endpoint.register);
    let headers = await SecurityService.getHeader();
    console.log("url "+url);
    console.log("headers"+JSON.stringify(headers));

    return fetch(url,{
      method: 'POST',
      headers: headers,
      body: param
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        let message = responseJson.message;
        console.log("response "+JSON.stringify(responseJson));
        if(status==200){
          return responseJson;
        }else{
            return ConnectionUtility.GenerateErrorMessage(status,message)
        }
      })
      .catch((error) => {
          console.error(error);
          return ConnectionUtility.exception();
      });
}

const getProfile = async()=>{
    const res = await getSession();
    const token = res.token;
    let url = await ServiceUrl.getRequestUrl(Endpoint.getProfile);
    console.log("getProfile url "+url);
    let headers = await SecurityService.getSecureHeader();
    console.log(">>>>>>>>>>>>"+JSON.stringify(res));
    const param = JSON.stringify({
      "id":3
  });


    return fetch(url,{
      method: 'POST',
      headers:headers,
      body: param
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        let message = responseJson.message;
        if(status==200){ 
            return responseJson;
        }else{
            return ConnectionUtility.GenerateErrorMessage(status,message)
        }
      })
      .catch((error) => {
          console.error(error);
          return ConnectionUtility.exception();
      });
}

const updateProfile = async(props)=>{
    const resp = await getSession();
    const token = resp.token;
    let url = await ServiceUrl.getRequestUrl(Endpoint.updateProfile);
    console.log(props);
    
    const formData = new FormData();
    if(typeof props.fullname != 'undefined' && props.fullname != null){
      formData.append('fullname', props.fullname);
    }
    if(typeof props.email != 'undefined' && props.email != null){
      formData.append('email', props.email);
    }
    if(typeof props.phone != 'undefined' && props.phone != null){
      formData.append('phone', props.phone);
    }
    if(typeof props.birthdate != 'undefined' && props.birthdate != null){
      formData.append('birthdate', props.birthdate);
    }
    if(typeof props.gender != 'undefined' && props.gender != null){
      formData.append('gender', props.gender);
    }
    formData.append('kta_photo', '');

    return fetch(url,{
      method: 'PUT',
      headers:{
        'accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      },
      body: JSON.stringify({
        fullname:props.fullname,
        email:props.email,
        phone:props.phone,
        birthdate:props.birthdate,
        gender:props.gender,
        kta_photo:'',
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        let message = responseJson.message;
        if(status==200){
        return responseJson;
                }else{
                    return ConnectionUtility.GenerateErrorMessage(status,message)
                }
            })
            .catch((error) => {
                console.error(error);
                return ConnectionUtility.exception();
        });
}


const updateToken = async(token)=>{
  console.log("updateToken");
    if(token!=null && token!=""){
      let timeStart = new Date().getTime();
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('lastRefreshToken', timeStart+"");
      return true;
    }else{
      return false;
    }
}

const validateToken = async(res)=>{
  const token = typeof res!= 'undefined' && res!=null ? res.token : "";
  const lastRefreshToken = typeof res != 'undefined' && res!=null ? res.lastRefreshToken : "";
  console.log("validateToken: lastRefreshToken: "+lastRefreshToken);
  let url = await ServiceUrl.getRequestUrl(Endpoint.refreshToken);

  let dateEnd = new Date();

  let timeStart = new Date().getTime();
  if(typeof lastRefreshToken !='undefined' && lastRefreshToken != null && lastRefreshToken!=""){
    timeStart = lastRefreshToken;
  }

  let timeEnd = dateEnd.getTime();
  let diff = GeneralUtility.getTimeDiff(timeStart,timeEnd);
  console.log("validateToken: diff time: "+JSON.stringify(diff));
  let minutes = typeof diff !='undefined' && diff!=null ? diff.minutes : "0";
  let hours = typeof diff !='undefined' && diff!=null ? diff.hours : "0";
  let min = parseInt(minutes);
  let hr = parseInt(hours);

  if(hr>tokenRefreshHour || min>=tokenRefreshDelay || lastRefreshToken == "" || lastRefreshToken==null || typeof lastRefreshToken == 'undefined'){
    console.log("kondisi 1");
    return fetch(url,{
      method: 'GET',
      headers:{
        'accept':'application/json',
        'Content-Type': 'aplication/json',
        'Authorization': 'Bearer '+token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        let message = responseJson.message; 
        if(status==500){
          return ""
        }else{
          if(status==402){
            let token = typeof responseJson.data != 'undefined' && responseJson.data !=null ? responseJson.data.refresh_token : "";
            if(typeof token != 'undefined' && token!=null){
              updateToken(token);
              return token;
            }else{
              return "";
            }
          }else{
            return "";
          }
        }
      })
      .catch((error) => {
        console.error(error);
        return ""
      });
  }else{
    console.log("kondisi 2");
    return "";
  }
}

const refreshToken = async()=>{
  const res = await getSession();
  const token = typeof res!= 'undefined' && res!=null ? res.token : "";
  const lastRefreshToken = typeof res != 'undefined' && res!=null ? res.lastRefreshToken : "";
  console.log("refreshToken: lastRefreshToken: "+lastRefreshToken);
  let url = await ServiceUrl.getRequestUrl(Endpoint.refreshToken);

  let dateEnd = new Date();

  let timeStart = new Date().getTime();
  if(typeof lastRefreshToken !='undefined' && lastRefreshToken != null && lastRefreshToken!=""){
    timeStart = lastRefreshToken;
  }

  let timeEnd = dateEnd.getTime();
  let diff = GeneralUtility.getTimeDiff(timeStart,timeEnd);
  console.log("diff time: "+JSON.stringify(diff));
  let minutes = typeof diff !='undefined' && diff!=null ? diff.minutes : "0";
  let min = parseInt(minutes);

  if(min>=tokenRefreshDelay){
    return fetch(url,{
      method: 'GET',
      headers:{
        'accept':'application/json',
        'Content-Type': 'aplication/json',
        'Authorization': 'Bearer '+token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let status = responseJson.status;
        let message = responseJson.message; 
        if(status==500){
          return ConnectionUtility.GenerateErrorMessage(status,message)
        }else{
          if(status==402){
            let token = typeof responseJson.data != 'undefined' && responseJson.data !=null ? responseJson.data.refresh_token : "";
            if(typeof token != 'undefined' && token!=null){
              updateToken(token);
            }
          }
          return responseJson;
        }
      })
      .catch((error) => {
        console.error(error);
        return ConnectionUtility.exception();
      });
  }else{
    return null;
  }
}

const refreshTokenInstant = async()=>{
  const res = await getSession();
  const token = typeof res!= 'undefined' && res!=null ? res.token : "";
  let url = await ServiceUrl.getRequestUrl(Endpoint.refreshToken);

  return fetch(url,{
    method: 'GET',
    headers:{
      'accept':'application/json',
      'Content-Type': 'aplication/json',
      'Authorization': 'Bearer '+token
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.data.status==500){
        return systemError
      }else{
        if(responseJson.status==402){
          let token = typeof responseJson.data != 'undefined' && responseJson.data !=null ? responseJson.data.refresh_token : "";
          if(typeof token != 'undefined' && token!=null){
            updateToken(token);
          }
        }
        return responseJson;
      }
    })
    .catch((error) => {
      console.error(error);
      return exception
    });
}

const logoutSession = async()=>{
  try {
      await AsyncStorage.setItem('token', '');
      await AsyncStorage.setItem('email', '');
      await AsyncStorage.setItem('profilePicture', '');
      await AsyncStorage.setItem('isUpdate', '0');
      await AsyncStorage.setItem('type','-1');
      return true;
  } catch (e) {
      console.log(e);
      return false;
  }
}

const checkAccount = async (props) => {
  const formData = new FormData();
  formData.append('param', props);

  let par = {
      param:props
  }
  let params = JSON.stringify(par);
  console.log('param',JSON.stringify(par));
 
  let url = await ServiceUrl.getRequestUrl(Endpoint.checkAccount);
  console.log("url check akun cuk: " + url);
  // let headers = await SecurityService.getSecureHeader();

  return fetch(url, {
      method: 'POST',
      headers:{
        'accept':'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: formData
  })
      .then((response) => response.json())
      .then((responseJson) => {  
          let status = responseJson.status;
          let message = responseJson.message;
          if(status==200){
              return responseJson;
          }else if (status==422) {
              return responseJson;
          }
          else{
              return ConnectionUtility.GenerateErrorMessage(status,message)
          }
      })
      .catch((error) => {
          console.error(error);
          return ConnectionUtility.exception();
      });
}

const API = {
    login,
    register,

    getProfile,
    updateProfile,
    getSession,
    updateToken,
    refreshToken,
    logoutSession,
    checkAccount,
    refreshTokenInstant,
}

export default API