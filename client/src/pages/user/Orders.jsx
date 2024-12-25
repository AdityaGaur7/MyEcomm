import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout title={"Orders"} description={"Orders"}>
      <div>
        <div className="container-fluid p-3 m-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h2>Orders</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
