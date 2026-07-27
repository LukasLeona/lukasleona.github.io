import { createContext, useState } from "react";



export const AuthContext = createContext(null);

export default ({children}) => {
    const [activeMenu, setActiveMenu] = useState('main');


  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    profile_picture: "",
    role: "",
    student_id: 0,
    is_verified: false,
    is_cosoa: false,
    is_web_admin: false,
    status: false
  });

    return (
        <AuthContext.Provider
        value={{
            auth: { authState, setAuthState },
            menu: { activeMenu, setActiveMenu },
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}