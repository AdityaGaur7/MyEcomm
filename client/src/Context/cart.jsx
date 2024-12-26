import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingcart = localStorage.getItem("cart");
    if (existingcart) {
      setCart(JSON.parse(existingcart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => {
  return useContext(CartContext);
};
export { CartProvider, useCart };
