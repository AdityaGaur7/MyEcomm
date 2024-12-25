import { useState, useEffect } from "react";
import axios from "axios";
import { Reactapi } from "../api";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/auth";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const { auth } = useAuth;
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/category/get-category`);
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

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
    getallCategory();
    getAllProducts();
  }, []);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    const filteredProducts = product.filter(
      (prod) => prod.category === category
    );
    setProduct(filteredProducts);
  };

  return (
    <Layout
      title={"Home"}
      description={"Homepage"}
      keywords={"electronics, buy electronics, cheap electronics"}
      author={"ProShop"}
    >
      <div className="row">
        <div className="col-md-3">
          <div className="text-center">Filter By Category</div>
          <ul className="list-group">
            {category?.map((c) => (
              <li
                key={c._id}
                className={`list-group-item ${
                  selectedCategory === c?.name ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(c?.name)}
              >
                {c?.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-9">
          <div className="text-center">All Products</div>
          <div className="d-flex flex-wrap">
            {product.map((product) => (
              <div
                key={product._id}
                className="card m-2"
                style={{ width: "18rem" }}
              >
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <NavLink href="#" className="btn btn-primary">
                    View Details
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
