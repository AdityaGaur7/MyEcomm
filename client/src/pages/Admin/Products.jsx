import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Reactapi } from "../../api";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Products" description="Products">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2>All Products</h2>

          <div className="row">
            {product?.map((prod) => (
              <div key={prod._id} className="col-md-4">
                <NavLink to={`/dashboard/admin/product/${prod.slug}`}>
                  <div className="card">
                    <img
                      src={prod.image}
                      className="card-img-top"
                      alt={prod.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{prod.name}</h5>
                      <p className="card-text">{prod.description}</p>
                      <p className="card-text">${prod.price}</p>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
