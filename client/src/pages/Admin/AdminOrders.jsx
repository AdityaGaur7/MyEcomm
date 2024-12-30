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
    <Layout title={"Admin Orders"} description={"Admin Orders"}>
      <div>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="text-center">All Orders</div>
            {orders?.map((order, index) => {
              return (
                <div key={index} className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Time</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <Select
                          defaultValue={order?.status}
                          style={{ width: 120 }}
                          onChange={(value, orderId) =>
                            handleChange(value, order._id)
                          }
                        >
                          {status.map((item, index) => (
                            <Select.Option key={index} value={item}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>

                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>
                          {order?.payment?.razorpay_payment_id ? (
                            <span className="text-success">Paid</span>
                          ) : (
                            <span className="text-danger">Pending</span>
                          )}
                        </td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  {order?.products?.map((item, index) => (
                    <div key={index} className="row p-2">
                      <div className="col-md-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-8">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <p>Price: {item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
