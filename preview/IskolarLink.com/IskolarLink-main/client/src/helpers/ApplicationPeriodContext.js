import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ApplicationPeriodContext = createContext();

export const useApplicationPeriod = () => useContext(ApplicationPeriodContext)

export const ApplicationPeriodProvider = ({ children }) => {
    const [period,setPeriod] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/landingpage/application_period`).then((res)=>{
            setPeriod(res.data.status)
        })
    },[])

    return(
        <ApplicationPeriodContext.Provider
        value={{period, setPeriod}}>
            {children}
        </ApplicationPeriodContext.Provider>
    );
};