import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";

import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
const Cart = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const totalPrices = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total += item.price 
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCardItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Cart"} description={"Cart"}>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center bg-light p-2">
                <h1>
                  {`Hello ${auth?.token && auth?.user?.name}, Your Cart Items`}
                </h1>
                <div className="text-center">
                  {cart?.length > 1 ? (
                    <h2>{`You have ${cart?.length} items in your cart ${
                      auth?.token ? " " : "please login to checkout"
                    }`}</h2>
                  ) : (
                    "Your cart is empty"
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-9">
                  {cart?.map((item, index) => (
                    <div key={index} className="row p-2">
                      <div className="col-md-4">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-8">
                        <h4>{item?.name}</h4>
                        <p>{item?.description}</p>
                        <p>Price: {item?.price}</p>
                       
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            removeCardItem(item._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-md-3 text-center">
                  <h2>Cart Summary</h2>
                  <p>Total | Checkout | payment</p>
                  <hr />
                  <h4>Total : {totalPrices()}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
