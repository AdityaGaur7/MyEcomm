import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";
import { Reactapi } from "../../api";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`${Reactapi}/api/auth/getorders`, {
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

  return (
    <Layout title={"Orders"} description={"Orders"}>
      <div>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
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
                          <td>{order?.status}</td>
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
      </div>
    </Layout>
  );
};

export default Orders;
