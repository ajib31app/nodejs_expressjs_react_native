import React, { lazy, Suspense, useState, useContext, useEffect } from 'react'; 
import { StyleSheet, View, TextInput, Dimensions, ActivityIndicator,Image, Platform, Alert, RefreshControl, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Sales from '../service/Sales';
import Spinner from 'react-native-loading-spinner-overlay';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Item from '../components/sales/Item';
import { AppContext as AppContextSales, AppContextProvider} from "../context/SalesContext";

const windowPadding = 10;
const containerPadding = 0;

export default function Home(props){
    return(
        <AppContextProvider>
            <AllData props={props}/>
        </AppContextProvider>    
    )    
}

 function AllData(props) {
    // const params = route.params;

    const {dataSemua, setDataSemua, 
        isLoadingSemua, setIsLoadingSemua,
        refresh, setRefresh,
        selectedData,setSelectedData,
        showDetail,setShowDetail} = useContext(AppContextSales);

    
    const navigation = useNavigation();
    const [isEmpty,setIsEmpty] = useState(false);
    const [filtered,setFiltered] = useState(false)
    const [isAll,setIsAll] = useState(false);
    const [page,setPage] = useState(1);
    const [loadMore,setLoadMore] = useState(false);
    const [scrollY,setScrollY] = useState(new Animated.Value(0));
    const [onProgress,setOnProgress] = useState(false);

  

    let statusFilter = 'all';
    const getHistoryTransactions = async()=>{
        // reset dataset:
        setDataSemua([])
        // end reset
        setIsLoadingSemua(true); 
        let pg = 1 
        let params = {
            page:pg,
            status:statusFilter
        } 
        // const result = await Sales.getListSales(params);
        const result = await Sales.getListSales();
        let statusCode = typeof result !='undefined' && result !=null && result !={} ? result.status : 0;
        console.log("done>>>>>>>>>>>");
        setIsLoadingSemua(false);
        if(statusCode==200){
            
            const resData = typeof result.data != 'undefined' && result.data !=null && result.data !={} ? result.data : null;
            // const data  = typeof resData != 'undefined' && resData !=null && resData !={} && resData !=[] ? resData.data : [];
            console.log(">>>>>>>>>>>>: "+JSON.stringify(resData));
            if(resData != null && resData.length > 0){
                setPage(pg+1)
                // const dat = result.data.data;
                var list = [];
                // const data = dat;
                for(i=0; i<resData.length; i++){
                    var d = resData[i];
                    list.push(d);
                }
                setDataSemua(list);
                setIsEmpty(false)
                setFiltered(false)
                setIsAll(false)
            }else {
                setOnProgress(false);
                setLoadMore(false);
                setIsAll(true);
            }
            
        }else if(statusCode==403){
            setOnProgress(false);
            setLoadMore(false);
            setIsAll(true);
        }else{
            setOnProgress(false);
            setLoadMore(false);
            setIsAll(true);
        }
    }



    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize})=>{
        const paddingToBottom = 10;
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    }
 

    const onRefresh = ()=>{  
        setIsAll(false)
        setFiltered(false)
        getHistoryTransactions()
    }


    useState(()=>{
        getHistoryTransactions();
    })
    

    useEffect(()=>{
        if(loadMore){
            if(!onProgress && !isLoadingSemua && !isAll){
                setOnProgress(true);
                more(page);
            }else{
                return
            }
        }
    })

    useEffect(()=>{
        if(refresh){
            setRefresh(false);
            onRefresh();
        }
    })

    

    const getSales = async ()=>{
      setIsLoading(true);
      const result = await Sales.getListSales();
      
      setIsLoading(false); 
      let statusCode = typeof result !='undefined' && result !=null && result !={} ? result.status : 0;
      if(statusCode==200){
        let data = typeof result != 'undefined' && result!=null ? result.data : null;
        setDataSales(data);
      }
    }

    return (
        <View style={styles.container}>
        <Spinner
            visible={isLoadingSemua}
            textContent={"Getting data..."}
            textStyle={styles.spinnerTextStyle}/>         
            
            
        
            {isEmpty ? 
                <Empty/>:
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={50}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refresh} 
                            onRefresh={onRefresh}/>
                    }
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        {
                        listener: event => {
                            if (isCloseToBottom(event.nativeEvent)) {
                                // setLoadMore(true);
                            }
                        }
                        }
                    )}
                >
                    <View style={styles.content}>
                            {dataSemua.map((data,index)=>
                                <View key={index} style={styles.containerItem}>
                                    <Item data={data}/>
                                </View>
                            )}
                            {onProgress ? 
                                <ActivityIndicator size="large" color="#E0A526" hidesWhenStopped={true} animating={true} style={{marginBottom:hp('15%')}}/>:null}
                    </View>
                </ScrollView>
            }
            {/* {showDetail ? 
                <View style={{position:'absolute',width:wp('100%'), height:hp('100%')}}>
                    <DetailTransaksiPPOB data={selectedData}/>
                </View>
                :null
            } */}
    </View>
    )

   

    // return (
    //     <ScrollView
    //                     showsVerticalScrollIndicator={false}
    //                     scrollEventThrottle={50}
    //                     refreshControl={
    //                         <RefreshControl 
    //                             refreshing={refresh} 
    //                             onRefresh={onRefresh}/>
    //                     }
    //                     onScroll={Animated.event(
    //                         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    //                         {
    //                         listener: event => {
    //                             if (isCloseToBottom(event.nativeEvent)) {
    //                                 setLoadMore(true);
    //                             }
    //                         }
    //                         }
    //                     )}
    //                 >
    //                     <View style={styles.content}>
    //                             {dataSales.map((data,index)=>
    //                                 <View key={index} style={styles.containerItem}>
    //                                     <Item data={data} />
    //                                 </View>
    //                             )}
    //                             {onProgress ? 
    //                                 <ActivityIndicator size="large" color="#E0A526" hidesWhenStopped={true} animating={true} style={{marginBottom:hp('15%')}}/>:null}
    //                     </View>
    //                 </ScrollView>
    //   );
  }

  
  

const styles = StyleSheet.create({
    container: {
      display:'flex',
      flexDirection:'column',
      backgroundColor:'#FAFAFA',
      flex:1
    },
    content:{
        padding:containerPadding,
    },
    containerItem:{
        backgroundColor:'#FFF',
        borderRadius:wp('0.5%'),
        paddingTop:wp('5%'),
        paddingBottom:wp('5%'),
        paddingLeft:windowPadding,
        paddingRight:windowPadding,
        marginBottom:wp('2%'),
        marginLeft:wp('2%'),
        marginRight:wp('2%'),
        marginTop:wp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: wp('0.5%'),
        },
        shadowOpacity: wp('0.1%'),
        shadowRadius: wp('1%'),
        elevation: wp('1%'),
    },
    divider:{
        height:1,
        backgroundColor:'#DDDDDD',
        flexDirection:'row',
        marginTop:wp('20%'),
        marginBottom:wp('20%')
    },
    
    inputStyle:{
        width:wp('100%'),
        fontSize:14,
        color:'#434343',
        paddingTop:hp('1%'),
        paddingBottom:hp('1%')
    },
    buttonAtur:{
        backgroundColor:'#E0A526',
        width:'80%',
        paddingTop:wp('2%'),
        paddingBottom:wp('2%'),
        borderRadius:wp('5%'),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontSize:14
    },
    containerMain: {
        height:hp('10%'),
        backgroundColor: '#FAFAFA',
        alignItems:"center",
        flexDirection:'column',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 1,
    },
    searchInput: {
        // flex:1,
        height: hp('6%'), 
        width: wp('90%'), 
        backgroundColor: '#FFFFFF',
        borderWidth: wp('0.5%'), 
        borderRadius: wp('50%'),  
        marginLeft:wp('5%'),
        marginRight:wp('5%'),
        fontSize: wp('10%'), 
        borderColor:'#DDDDDD',
        // borderColor:'#DDDDDD',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    
    textField:{
        flex:1,
        marginLeft:wp('10%'),
        alignItems:"center",
        fontSize:14,
        color:'#434343',
      },

    header: {
        width:'100%',
        backgroundColor: '#FAFAFA',
        height:hp('10%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },

    btnCari:{
        flex:1,
        height: wp('50%'),
        borderTopRightRadius: wp('50%'), 
        borderBottomRightRadius: wp('50%'),
        
        fontSize: 8, 
        backgroundColor:'#E0A526',
        alignItems:'center',
        justifyContent:'center',         
    },

    inputSearch:{
        flex:1,
        flexDirection:'row',
        borderRadius:wp('1%'),
        paddingLeft:wp('2%'),
        paddingTop:wp('1%'),
        paddingBottom:wp('1%'),
        paddingRight:wp('5%'),
        borderWidth:wp('0.5%'),
        borderColor:'#DDDDDD',
        marginTop:wp('1.5%'),
        marginLeft:wp('2.5%'),
        marginRight:wp('2.5%'),
        marginBottom:wp('1.5%'),
        alignItems:'center'
    }
  });


