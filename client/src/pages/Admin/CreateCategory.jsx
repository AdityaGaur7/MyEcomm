import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title={"Create Category"} description={"Create Category"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2>All Category</h2>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
