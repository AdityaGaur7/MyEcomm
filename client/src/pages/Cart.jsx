import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/cart";
import { Reactapi } from "../api";
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
    <Layout title={"Cart"} description={"Cart"}>
      <div className="container">
        <h1>{`Hello ${auth?.user?.name || "Guest"}, Your Cart Items`}</h1>
        <div className="row">
          <div className="col-md-9">
            {cart?.map((item, index) => (
              <div key={index} className="row p-2">
                <div className="col-md-4">
                  <img src={item.image} alt={item.name} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>Price: {item.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCardItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3">
            <h2>Cart Summary</h2>
            <h4>Total: {totalPrices()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <p>{auth?.user?.address}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Add Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            )}
            <button className="btn btn-primary" onClick={handlePayment}>
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
