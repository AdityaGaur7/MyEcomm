import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword:"",
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { user, token } = JSON.parse(auth);
      setAuth({ user, token });
    }
  }, []);

  return (
    <CartContext.Provider value={{ auth, setAuth }}>
      {children}
    </CartContext.Provider>
  );
};
const useAuth = () => {
  return useContext(CartContext);
};
export { AuthProvider, useAuth };
