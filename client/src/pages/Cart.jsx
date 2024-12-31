import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import { Reactapi } from "../api";
import { FiTrash2, FiShoppingBag, FiMapPin, FiCreditCard, FiArrowLeft } from "react-icons/fi";

const Cart = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const totalPrices = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  const removeCardItem = (id) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === id);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const handlePayment = async () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    const response = await fetch(`${Reactapi}/api/payment/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalAmount }),
    });
    const data = await response.json();

    if (!data.success) {
      alert("Error creating Razorpay order");
      return;
    }

    const options = {
      key: "rzp_test_mn0PTHHGYdjsI8", // Replace with your Razorpay Key
      amount: data.order.amount,
      currency: data.order.currency,
      name: "E-Commerce Store",
      description: "Order Payment",
      image: "/logo.png",
      order_id: data.order.id,
      handler: async (response) => {
        try {
          const verifyResponse = await fetch(`${Reactapi}/api/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              response,
              products: cart,
              buyer: auth?.user?.id,
              address: auth?.user?.address,
              totalPrice: totalAmount,
            }),
          });
          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert("Payment Successful");
            setCart([]);
            localStorage.removeItem("cart");

            navigate("/dashboard/user/orders"); // Redirect after payment success
          } else {
            alert("Payment Verification Failed");
          }
        } catch (error) {
          console.error(error);
        }
      },
      prefill: {
        name: auth?.user?.name || "Guest",
        email: auth?.user?.email || "guest@example.com",
        contact: auth?.user?.phone,
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <Layout title={"Shopping Cart"} description={"Your Shopping Cart"}>
      {/* Header Section */}
      <div className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <button 
                onClick={() => navigate('/')} 
                className="btn btn-link text-white text-decoration-none"
              >
                <FiArrowLeft className="me-2" />
                Continue Shopping
              </button>
            </div>
            <div className="col text-center">
              <h1 className="h4 mb-0">Shopping Cart ({cart.length} items)</h1>
            </div>
            <div className="col-auto">
              {/* Placeholder for balance */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <div className="display-1 text-muted mb-4">
              <FiShoppingBag />
            </div>
            <h2 className="h4 mb-4">Your cart is empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="btn btn-primary btn-lg px-5"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {/* Cart Items */}
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  {cart.map((item, index) => (
                    <div 
                      key={index} 
                      className={`row align-items-center ${
                        index !== 0 ? 'mt-4 pt-4 border-top' : ''
                      }`}
                    >
                      <div className="col-md-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ 
                            height: "120px", 
                            width: "100%", 
                            objectFit: "cover" 
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="mb-2">{item.name}</h5>
                        <p className="text-muted mb-2">{item.description}</p>
                        <div className="d-flex align-items-center">
                          <div className="input-group input-group-sm" style={{ width: "120px" }}>
                            <button className="btn btn-outline-secondary">-</button>
                            <input type="text" className="form-control text-center" value="1" readOnly />
                            <button className="btn btn-outline-secondary">+</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 text-end">
                        <div className="h5 mb-3 text-primary">${item.price}</div>
                        <button
                          onClick={() => removeCardItem(item._id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          <FiTrash2 className="me-1" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h4 className="card-title mb-4">Order Summary</h4>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Subtotal</span>
                      <span className="fw-bold">{totalPrices()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Shipping</span>
                      <span className="text-success">Free</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Tax</span>
                      <span>$0.00</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                      <span className="h5">Total</span>
                      <span className="h5">{totalPrices()}</span>
                    </div>
                  </div>

                  {auth?.user?.address ? (
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
                        <FiMapPin className="text-primary me-2" />
                        <h6 className="mb-0">Delivery Address</h6>
                      </div>
                      <p className="text-muted small mb-3">{auth?.user?.address}</p>
                      <button
                        onClick={() => navigate("/dashboard/user/profile")}
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        Change Address
                      </button>
                    </div>
                  ) : (
                    <div className="mb-4">
                      {auth?.token ? (
                        <button
                          onClick={() => navigate("/dashboard/user/profile")}
                          className="btn btn-outline-primary w-100 mb-3"
                        >
                          <FiMapPin className="me-2" />
                          Add Delivery Address
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate("/login", { state: "/cart" })}
                          className="btn btn-outline-primary w-100 mb-3"
                        >
                          Login to Checkout
                        </button>
                      )}
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={!auth?.user?.address}
                    className="btn btn-primary w-100 btn-lg mb-3"
                  >
                    <FiCreditCard className="me-2" />
                    Proceed to Payment
                  </button>

                  <div className="text-center">
                    <img 
                      src="/payment-methods.png" 
                      alt="Payment Methods" 
                      className="img-fluid" 
                      style={{ maxHeight: "30px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
