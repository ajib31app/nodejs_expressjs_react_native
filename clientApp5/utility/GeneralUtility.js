import API from '../service/Auth';

import {decode as atob, encode as btoa} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const parseDate = (props)=>{
    const dateString = props;
    const arrDate = dateString.split(' ');
    if(arrDate.length>0){
        var arr2 = arrDate[0].split('-');
        if(arr2.length==3){
            var month = getMonth(arr2[1]);
            var dt = arr2[2]+" "+month+" "+arr2[0];
            return dt;
        }else{
            return null
        }
    }else{
        return null;
    }
}

const ParseTimeBasedOnDate = (props)=>{
    const dateString = props;
    const arrDate = dateString.split(' ');
    if(arrDate.length>0){
        var arr2 = arrDate[1].split(':');
        var result = arr2[0]+":"+arr2[1];
        return result;
    }else{
        return null;
    }
}

const getMonth = (props)=>{
    const month = props;
    if(month==1){
        return 'Januari';
    }else if(month==2){
        return 'Februari';
    }else if(month==3){
        return 'Maret';
    }else if(month==4){
        return 'April';
    }else if(month==5){
        return 'Mei';
    }else if(month==6){
        return 'Juni';
    }else if(month==7){
        return 'Juli';
    }else if(month==8){
        return 'Agustus';
    }else if(month==9){
        return 'September';
    }else if(month==10){
        return 'Oktober';
    }else if(month==11){
        return 'November';
    }else if(month==12){
        return 'Desember';
    }else{
        return null;
    }
}

const ValidateEmail = (mail)=>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true)
    }
    return false;
}

const FormatCurrency = (props)=>{
    var price = ""+props.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    var arrPrice = price.split('.');
    if(arrPrice.length>0){
        var curr = arrPrice[0].replace(/,/g, ".");
        return 'Rp. ' + curr;
    }else{
        return 'Rp. 0';
    }
}

const FormatCurrency2 = (props)=>{
    var price = ""+props.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    var arrPrice = price.split('.');
    if(arrPrice.length>0){
        var curr = arrPrice[0].replace(/,/g, ".");
        return 'Rp. ' + curr;
    }else{
        return 'Rp. 0';
    }
}

const FormatCurrency3 = (props)=>{
    var price = ""+props.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    var arrPrice = price.split('.');
    if(arrPrice.length>0){
        var curr = arrPrice[0].replace(/,/g, ".");
        return '' + curr;
    }else{
        return '';
    }
}

const GetCurrencyValue = (props)=>{
    let value = props.split(' ')
    if(value.length==2){
        // let number = value[1].replace(".", "")
        let number = value[1].split(".").join("")
        return number
    }else{
        return props
    }
}



const ValidateNumber = (str)=>{
    var numbers = /^[0-9]+$/;
    if(str.match(numbers)){
        return true;
    }else{
        return false
    }
}

const ValidatePassword = (prop)=>{
    let length = prop.length;
    if(length>6){
        return true;
    }else{
        return false;
    }
}

const ValidateAccount = async()=>{
    let session = await API.getSession();
    
    if (session!=null||session!='') {
        let email = (await session).email;
        // let type = (await session).type;

        if(email==null||email==''){
            return false;
        }else{
            return true;
        }

    }else{
        return false;
    }
}

function getTimeDiff( timeStart, timeEnd )
{
    var date1 = new Date("08/06/2015 01:00:00");
    var date2 = new Date("08/06/2015 02:00:00");

    // var diff = date2.getTime() - date1.getTime();
    console.log("timestart: "+timeStart+" : timeEnd: "+timeEnd);
    if(timeStart>timeEnd){
        var diff = timeStart - timeEnd;
    }else if(timeStart<timeEnd){
        var diff = timeEnd - timeStart;
    }

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    if(isNaN(hh)){
        hh = 0;
    }

    if(isNaN(mm)){
        mm = 0;
    }

    if(isNaN(ss)){
        ss = 0
    }

    let res = {
        hours:hh,
        minutes:mm,
        seconds:ss
    }
    return res;
}

const ValidatePhoneNumber = (inputtxt)=>{
    var phoneno10 = /^\d{10}$/;
    var phoneno11 = /^\d{11}$/;
    var phoneno12 = /^\d{12}$/;
    if((inputtxt.match(phoneno10) || inputtxt.match(phoneno11) || inputtxt.match(phoneno12))){
        return true;
    }else{
        return false;
    }
}



const EncodeBase64 =(value)=>{
    return btoa(value);
}

const DecodeBase64 = (value)=>{
    return atob(value);
}



const GetFingerprint = async()=>{
    return await AsyncStorage.getItem("fingerprint");
}

const CreateIFrame = (link,width,height)=>{
    let a = "ini sample gan";
    let iframe = "<iframe width="+width+" height="+height+" src="+link+" frameborder=0 allow=accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; ></iframe>"
    console.log("iframe gannnnn: "+iframe);
    return iframe;
    // let iframe = "<iframe width="200" height="113" src="https://www.youtube.com/embed/pl2OAuBm0c8?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"
}

const GeneralUtility = {
    parseDate,
    ValidateEmail,
    FormatCurrency,
    ParseTimeBasedOnDate,
    ValidateNumber,
    ValidatePassword,
    GetCurrencyValue,
    ValidateAccount,
    getTimeDiff,
    FormatCurrency3,
    getMonth,
    ValidatePhoneNumber,
    EncodeBase64,
    DecodeBase64,
    GetFingerprint,
    CreateIFrame
}

export default GeneralUtility