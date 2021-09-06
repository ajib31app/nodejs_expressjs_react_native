import Endpoint from '../service/Config';
import ServiceUrl from '../service/ServiceUrl';
import SecurityService from '../service/SecurityService';
import ConnectionUtility from '../utility/ConnectionUtility';

const getListSales = async()=>{
    let url = await ServiceUrl.getRequestUrl(Endpoint.getListSales);
    console.log("getListSales url: "+url);
    let headers = await SecurityService.getSecureHeader();
    // let headers = await SecurityService.getHeader();

    return fetch(url,{
        method: 'POST',
        headers:headers
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let status = responseJson.status;
            let message = responseJson.message;
            console.log(JSON.stringify(responseJson));
            if(status==200){
                const datas = responseJson;
                return datas;
            }else{
                return ConnectionUtility.GenerateErrorMessage(status,message)
            }
        })
        .catch((error) => {
            console.error(error);
            return ConnectionUtility.exception();
    });
}

const addAddress = async(props)=>{
    let nama_alamat = props.nama_alamat;
    let nama_penerima = props.nama_penerima;
    let telepon = props.telepon;
    let alamat = props.alamat;
    let kode_pos = props.kode_pos;
    let latitude = props.latitude;
    let longitude = props.longitude;
    let alamat_utama = props.alamat_utama;

    let par = {
        nama_alamat:nama_alamat,
        nama_penerima:nama_penerima,
        telepon:telepon,
        alamat:alamat,
        kode_pos:kode_pos,
        latitude:latitude,
        longitude:longitude,
        alamat_utama:alamat_utama
    }
    let params = JSON.stringify(par);

    let url = await ServiceUrl.getRequestUrlV2(Endpoint.addAddress);
    console.log("url: "+url);
    let headers = await SecurityService.getSecureHeader();

    return fetch(url,{
        method: 'POST',
        headers:headers,
        body:params
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let status = responseJson.status;
            let message = responseJson.message;
            if(status==200){
                const datas = responseJson;
                return datas;
            }else if (status==422){
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

const removeAddress = async(props)=>{
    let id = props.id;
    let url = await ServiceUrl.getRequestUrlV2(Endpoint.removeAddress)+"/"+id;
    console.log("url: "+url);
    let headers = await SecurityService.getSecureHeader();

    return fetch(url,{
        method: 'DELETE',
        headers:headers
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let status = responseJson.status;
            let message = responseJson.message;
            if(status==200){
                const datas = responseJson;
                return datas;
            }else{
                return ConnectionUtility.GenerateErrorMessage(status,message)
            }
        })
        .catch((error) => {
            console.error(error);
            return ConnectionUtility.exception();
    });
}

const updateAddress = async(props)=>{
    let par = {
        nama_alamat: props.nama_alamat,
        nama_penerima: props.nama_penerima,
        telepon: props.telepon,
        alamat: props.alamat,
        kode_pos: props.kode_pos,
        latitude: props.latitude,
        longitude: props.longitude,
        alamat_utama: props.alamat_utama
    }
    let id = props.id;
    let params = JSON.stringify(par);
    let url = await ServiceUrl.getRequestUrlV2(Endpoint.removeAddress)+"/"+id;
    console.log("url: "+url);
    let headers = await SecurityService.getSecureHeader();

    return fetch(url,{
        method: 'PATCH',
        headers:headers,
        body:params
        })
        .then((response) => response.json())
        .then((responseJson) => {
            let status = responseJson.status;
            let message = responseJson.message;
            if(status==200){
                const datas = responseJson;
                return datas;
            }else if (status==422){
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

const Address = {
    getListSales,
    addAddress,
    removeAddress,
    updateAddress
}

export default Address