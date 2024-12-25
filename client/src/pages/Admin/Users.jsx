import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Users = () => {
  return (
    <Layout title={"All Users"} description={"All Users"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2>All Users</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
