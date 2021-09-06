import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    let [dataSemua,setDataSemua] = useState([]);  

    let [isLoadingSemua,setIsLoadingSemua] = useState(false);
    
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedData,setSelectedData] = useState({});
    const [showDetail,setShowDetail] = useState(false);
    
    return (
      <AppContext.Provider value={{ dataSemua,setDataSemua,                                    
                                    isLoadingSemua,setIsLoadingSemua,
                                    refresh, setRefresh,
                                    loading, setLoading,
                                    selectedData,setSelectedData,
                                    showDetail,setShowDetail
                                    }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  export { AppContext, AppContextProvider };