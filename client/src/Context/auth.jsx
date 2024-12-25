import { useState,useEffect,useContext,createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    })

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        if(auth){
            const {user,token} = JSON.parse(auth);
            setAuth({user,token});
            
         
        }
    }, [])

    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}  
const useAuth = () => {
    return useContext(AuthContext);
}
export {AuthProvider,useAuth};

