import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AccreditationStatusContext = createContext();

export const useAccreditationStatus = () => useContext(AccreditationStatusContext);

export const AccreditationStatusProvider = ({ children }) => {
    const [accreditationStatus, setAccreditationStatus] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/student/accreditation_status`).then((response) => {
            if(response.data.error){
            }
            else{
                setAccreditationStatus(response.data.status);
            }
        });
    }, []);

    return (
        <AccreditationStatusContext.Provider value={{ accreditationStatus, setAccreditationStatus }}>
            {children}
        </AccreditationStatusContext.Provider>
    );
};
