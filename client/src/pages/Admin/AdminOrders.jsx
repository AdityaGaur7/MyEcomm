import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { useEffect, useState } from "react";
import moment from "moment";
import React from "react";
import { Reactapi } from "../../api";
import { Select } from "antd";
import { FiFilter, FiDownload } from "react-icons/fi";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel ",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`${Reactapi}/api/auth/all-orders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const data = response.data;
      console.log("Orders Data:", data);
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Get Orders Error:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  const handleChange = async (value, orderId) => {
    try {
      const response = await axios.put(
        `${Reactapi}/api/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      const data = response.data;
      getOrders();
      console.log("Change Status Data:", data);
      if (data.success) {
        toast.success(data.message);
        getOrders();
      }
    } catch (error) {
      console.log("Change Status Error:", error);
    }
  };
  return (
    <Layout title="Admin Orders" description="Manage Orders">
      <div className="admin-layout">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 admin-sidebar">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-content">
              <div className="admin-card p-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Order Management</h3>
                  <div className="btn-group">
                    <button className="btn btn-outline-primary">
                      <FiFilter className="me-2" />
                      Filter
                    </button>
                    <button className="btn btn-outline-primary">
                      <FiDownload className="me-2" />
                      Export
                    </button>
                  </div>
                </div>

                {orders?.map((order, index) => (
                  <div key={index} className="admin-card mb-4 fade-in" 
                       style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="card-header bg-light p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="mb-0">Order #{order._id}</h5>
                        </div>
                        <div className="col-auto">
                          <Select
                            value={order?.status}
                            onChange={(value) => handleChange(value, order._id)}
                            className="min-w-[150px]"
                          >
                            {status.map((item) => (
                              <Select.Option key={item} value={item}>
                                {item}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="card-body p-4">
                      <div className="row mb-4">
                        <div className="col-md-3">
                          <small className="text-muted d-block mb-1">Customer</small>
                          <strong>{order?.buyer?.name}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block mb-1">Date</small>
                          <strong>{moment(order?.createdAt).format('MMM D, YYYY')}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block mb-1">Payment Status</small>
                          <span className={`badge ${
                            order?.payment?.razorpay_payment_id 
                              ? 'bg-success' 
                              : 'bg-warning'
                          }`}>
                            {order?.payment?.razorpay_payment_id ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block mb-1">Items</small>
                          <strong>{order?.products?.length} items</strong>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <table className="table admin-table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Name</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order?.products?.map((item, idx) => (
                              <tr key={idx}>
                                <td>
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="img-fluid rounded"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
