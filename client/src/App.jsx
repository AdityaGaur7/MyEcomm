import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/auth";
import { CartProvider } from "./Context/cart";
import { SearchProvider } from "./Context/search.jsx";
import Routes from "./Routes.jsx";
import "./styles/common.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <div className="app">
              <Routes />
            </div>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
