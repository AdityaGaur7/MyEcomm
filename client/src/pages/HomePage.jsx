import { useState, useEffect } from "react";
import axios from "axios";
import { Reactapi } from "../api";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { useCart } from "../Context/cart";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Button } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cart, setCart } = useCart();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products per page

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/category/get-category`);
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        setFilteredProducts(data.products); // Initialize filtered products
        console.log(data.products);
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

  useEffect(() => {
    filterProducts();
  }, [checked, radio, product]);

  const handleCategoryChange = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProducts = () => {
    let tempProducts = product;

    // Filter by selected categories
    if (checked.length > 0) {
      tempProducts = tempProducts.filter((prod) =>
        checked.includes(prod.category._id)
      );
    }

    // Filter by selected price range
    if (radio.length > 0) {
      const [min, max] = radio;
      tempProducts = tempProducts.filter(
        (prod) => prod.price >= min && prod.price <= max
      );
    }

    setFilteredProducts(tempProducts);
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout
      title={"Home"}
      description={"Homepage"}
      keywords={"electronics, buy electronics, cheap electronics"}
      author={"ProShop"}
    >
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-2">
            <Button
              onClick={() => window.location.reload()}
              className="btn btn-danger"
            >
              Reset Filter
            </Button>
            <div className="text-center mb-3">Filter By Category</div>
            <ul className="d-flex flex-column">
              {category?.map((c) => (
                <Checkbox
                  key={c._id}
                  className={`list-group-item d-flex${
                    checked.includes(c._id) ? " active" : ""
                  }`}
                  onChange={(e) =>
                    handleCategoryChange(e.target.checked, c._id)
                  }
                >
                  {c?.name}
                </Checkbox>
              ))}
            </ul>

            <div className="text-center mb-3">Filter By Price</div>
            <ul className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map((p) => (
                  <div key={p.id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </ul>
          </div>
          <div className="col-md-9">
            <div className="text-center mb-3">All Products</div>
            <div className="d-flex flex-wrap justify-content-center">
              {currentProducts.map((product) => (
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
                    <p className="card-text">{product.category._id}</p>
                    <button
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="btn btn-primary"
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-secondary mt-2"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Product Added to Cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Component */}
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() =>
                      handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                    }
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li className="page-item" key={index + 1}>
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() =>
                      handlePageChange(
                        currentPage < totalPages ? currentPage + 1 : totalPages
                      )
                    }
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
