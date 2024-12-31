import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { Reactapi } from "../../api";
import moment from "moment";
import { FiPackage, FiClock, FiUser, FiDollarSign, FiTruck } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`${Reactapi}/api/auth/getorders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log("Get Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'warning';
      case 'shipped': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Layout title="Orders" description="Your Order History">
      <div className="user-layout">
        <div className="user-sidebar">
          <UserMenu />
        </div>
        
        <div className="user-content">
          <div className="user-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="mb-1">My Orders</h3>
                <p className="text-muted mb-0">Track and manage your orders</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-light">
                  <FiClock className="me-2" />
                  Last 30 Days
                </button>
                <button className="btn btn-primary">
                  <FiTruck className="me-2" />
                  Track Order
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-5">
                <div className="display-1 text-muted mb-4">
                  <FiPackage />
                </div>
                <h4>No Orders Found</h4>
                <p className="text-muted">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order, index) => (
                  <div key={order._id} className="user-card mb-4">
                    <div className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <div className={`status-icon bg-${getStatusColor(order.status)}-subtle me-3`}>
                            <FiPackage className={`text-${getStatusColor(order.status)}`} />
                          </div>
                          <div>
                            <h5 className="mb-1">Order #{order._id.slice(-8)}</h5>
                            <p className="text-muted mb-0">
                              {moment(order.createdAt).format('MMMM D, YYYY')}
                            </p>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className={`badge bg-${getStatusColor(order.status)}-subtle text-${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="products-grid">
                        {order.products.map((item, idx) => (
                          <div key={idx} className="product-item p-3 border rounded">
                            <div className="row align-items-center">
                              <div className="col-md-2">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="img-fluid rounded"
                                />
                              </div>
                              <div className="col-md-7">
                                <h6 className="mb-1">{item.name}</h6>
                                <p className="text-muted small mb-0">{item.description}</p>
                              </div>
                              <div className="col-md-3 text-end">
                                <h6 className="mb-0 text-primary">${item.price}</h6>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-footer mt-4 pt-3 border-top">
                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <div className="d-flex align-items-center text-muted">
                              <FiUser className="me-2" />
                              {order.buyer?.name}
                            </div>
                          </div>
                          <div className="col-md-4 text-center">
                            <div className="d-flex align-items-center justify-content-center text-muted">
                              <FiDollarSign className="me-2" />
                              Payment: {order.payment?.razorpay_payment_id ? 
                                <span className="text-success ms-1">Paid</span> : 
                                <span className="text-danger ms-1">Pending</span>
                              }
                            </div>
                          </div>
                          <div className="col-md-4 text-end">
                            <button className="btn btn-outline-primary btn-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
