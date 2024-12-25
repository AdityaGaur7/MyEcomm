import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateProduct = () => {
  return (
    <Layout title={"Create Products"} description={"Create Products"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2>All Products</h2>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
