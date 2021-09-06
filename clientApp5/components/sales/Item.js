import React, { useState,useContext } from 'react';
import { StyleSheet, View, TextInput, Dimensions, Image, ActivityIndicator } from 'react-native';
import Text from '../../components/text/Text';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Divider from '../../components/divider/Divider';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import GeneralUtility from '../../utility/GeneralUtility';
import { AppContext as AppContextSales, AppContextProviderSales} from "../../context/SalesContext";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowPadding = 0;
const containerPadding = 0;

function Item(props) {

    const [data,setData] = useState(props.data);    
    let ctx = AppContextSales;
    const {
            refresh,setRefresh,
            loading, setLoading,
            showDetail, setShowDetail} = useContext(ctx);
    
    const navigation = useNavigation(); 


    var trxInvoice = data.id;
    var customerName = data.customer_name;
    var qtyTotal = data.qty_total;
    var grandTotal = data.grand_total;
    var trxStatusCode = data.status;
    console.log("trxStatusCode "+trxStatusCode);
    var trxDate = data.createdAt;


    return (
        <View style={styles.container}>
            <View style={styles.content}> 
                <View style={styles.containerItem}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <View>  
                            <View style={{flex:1, flexDirection:'column'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                
                                }}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between'}}>
                                            <Date_ created_at={typeof trxDate != 'undefined' && trxDate != null ? trxDate : null}/>
                                            <InvoiceNumber invoiceNumber={typeof trxInvoice != 'undefined' && trxInvoice != null ? trxInvoice : ""}/>
                                        </View> 
                                    </View> 
                                    <Divider style={styles.divider}></Divider>

                                    <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}> 
                                        <View style={{flex:1, flexDirection:'row', justifyContent: 'flex-start',     alignItems: 'center'}}>
                                            <Text h4 bold style={{color:'#434343', marginLeft:wp('2%')}}>{typeof customerName != 'undefined' && customerName != null ? customerName : ""}</Text>

                                            
                                        </View>                                    
                                        <View style={{flexDirection:'column', alignItems: 'flex-end', flex:1}}>
                                            <Text h5 style={{color:'#434343'}}>Status </Text>
                                            <Status trxStatusCode={typeof trxStatusCode != 'undefined' && trxStatusCode != null ? trxStatusCode : null} 
                                          />
                                        </View>  
                                    </View>  
                                    {typeof qtyTotal != 'undefined' && qtyTotal != null ?
                                                <View style={{flexDirection:'row', alignItems: 'flex-start', flex:1, paddingLeft:10}}>
                                                    <Text h5 style={{color:'#434343'}}>Quantity </Text>
                                                    <Text h5 bold style={{color:'#FF1E00', }}>{qtyTotal}</Text>
                                                </View>:
                                                null
                                            }
                                 
                                    <Divider style={styles.divider}></Divider>

                                    {typeof grandTotal != 'undefined' && grandTotal != null ?
                                        <View style={{flexDirection:'row', alignItems: 'flex-start', flex:1, paddingLeft:10}}>
                                            <Text h5 style={{color:'#434343'}}>Grand Total </Text>
                                            <Text h4 bold style={{color:'#FF1E00', paddingLeft:5}}>{GeneralUtility.FormatCurrency(parseFloat(grandTotal))}</Text>
                                        </View>:
                                        null
                                    }
                                    
                                </TouchableOpacity>

                              
                                {loading 
                                    ? 
                                    <ActivityIndicator size="large" color="#E0A526" hidesWhenStopped={true} animating={true} style={{marginTop:hp('3%'),alignSelf:'center'}}/>
                                    :null
                                }
                            </View> 
                        </View>   
                    </View> 
                </View>    
            </View> 
        </View>
    )
    
}
 
function Date_(props){ 
    let created_at = typeof props !='undefined' ? props.created_at : ''; 
    var date = new Date(created_at);
    let dt = date.getDate();
    let mnt = date.getMonth()+1;
    let yr = date.getFullYear();
    created_at = yr+"-"+mnt+"-"+dt;
    created_at = GeneralUtility.parseDate(created_at);
    return(
        <View>
            <Text h5 style={{color:'#434343'}}>{created_at}</Text>
        </View>
    )
}

function InvoiceNumber(props){
    var inv = "("+props.invoiceNumber+")";
    return(
        <View>
            <Text h5  style={{color:'#E0A526', marginLeft:wp('2%')}}>{"INVOICE "+inv}</Text>
        </View>
    )
}

function CategoryName(props){
    var catName = props.categoryName;
    return(
        <View>
            <Text h4 bold style={{color:'#434343', marginLeft:wp('2%')}}>{catName}</Text>
        </View>
    )
}

function BtnBeli(props){ 
    var data = typeof props.data != 'undefined' && props.data != null? props.data : null;  
    var trxStatusCode = typeof data.status != 'undefined' && data.status != null? data.status : null;  
    var catId = typeof data.category.id != 'undefined' && data.category.id != null? data.category.id : '0'; 
    const navigation = useNavigation(); 
    return ( 
        <View>
            {trxStatusCode == 2 ? 
            <View style={styles.btnBeli}>
                <TouchableOpacity
                    onPress={()=>{  
                        if(catId === 3){
                            navigation.navigate("PpobGopay")
                        } else if(catId === 4){
                            navigation.navigate('ListrikPLN');
                        }
                    }}
                    >
                    <Text h6 style={{color:'#FFFFFF'}}>Beli Lagi</Text>
                </TouchableOpacity>
            </View> : <View></View>} 
        </View>
        
    )
}



function Status(props){
    var trxStatusCode = props.trxStatusCode;
    var statusText;
    var color = '#00A751';
    
    
    if(trxStatusCode == 2){//berhasil
        color = '#00A751';
        statusText = "Success";
        // statusText = "Transaksi Berhasil";
    }else if(trxStatusCode == 1){ //dalam proses
        color = '#ffae00'; // asal dlu
        statusText = "On Progress";
        // statusText = "Dalam Proses";
    }else if(trxStatusCode == 0){ //pending / menunggu pembayaran
        color = '#ffae00'; // asal dlu
        statusText = "Pending";
        // statusText = "Menunggu Pembayaran";
    }else if(trxStatusCode == -3){ //failed
        color = '#FF1E00';
        statusText = "Failed";
        // statusText = "Transaksi Gagal";
    }else if(trxStatusCode == 3){ //batal
        color = '#FF1E00';
        statusText = "Cancel";
        // statusText = "Transaksi Dibatalkan";
    }
    
    
    return(
        <View style={{alignItems:'flex-end'}}>
            <Text h5 bold style={{color:color, marginLeft:2}}>{statusText}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      display:'flex',
      flexDirection:'column',
      backgroundColor:'#F8F8F8',
      flex:1
    },
    content:{
        padding:containerPadding,
    },
    containerItem:{
        backgroundColor:'#FFF',
        borderRadius:0,
        paddingTop:0,
        paddingLeft:windowPadding,
        paddingRight:windowPadding,
        paddingBottom:0,
        marginBottom:0
    },
    divider:{
        height:1,
        backgroundColor:'#DDDDDD',
        flexDirection:'row',
        marginTop:15,
        marginBottom:15
    },
    imageStyle:{
        width:wp('25%'),
        height:wp('25%')
    },
    btnBeli:{
        width:wp('20%'),
        height:wp('10%'), 
        backgroundColor:'#E0A526', 
        borderRadius:wp('50%'),
        justifyContent:'center',
        alignItems:'center'
    },
});


export default React.memo(Item);