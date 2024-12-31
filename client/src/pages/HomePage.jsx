import { useState, useEffect } from "react";
import axios from "axios";
import { Reactapi } from "../api";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { useCart } from "../Context/cart";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { FiShoppingCart, FiHeart, FiFilter } from "react-icons/fi";

const HomePage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cart, setCart } = useCart();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

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
    <Layout title={"Home"} description={"Homepage"}>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4">Discover Amazing Products</h1>
              <p className="lead mb-4">Shop the latest trends with confidence</p>
              <button className="btn btn-outline-light btn-lg">Shop Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Mobile Filter Toggle */}
        <div className="d-md-none mb-3">
          <button 
            className="btn btn-outline-primary w-100"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="me-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="row">
          {/* Filters Panel */}
          <div className={`col-md-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-md-block'}`}>
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="mb-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="btn btn-danger w-100"
                  >
                    Reset Filters
                  </button>
                </div>

                <div className="mb-4">
                  <h5 className="card-title">Categories</h5>
                  <div className="d-flex flex-column gap-2">
                    {category?.map((c) => (
                      <Checkbox
                        key={c._id}
                        onChange={(e) => handleCategoryChange(e.target.checked, c._id)}
                      >
                        {c?.name}
                      </Checkbox>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="card-title">Price Range</h5>
                  <Radio.Group 
                    onChange={(e) => setRadio(e.target.value)}
                    className="d-flex flex-column gap-2"
                  >
                    {Prices.map((p) => (
                      <Radio key={p.id} value={p.array}>
                        {p.name}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {currentProducts.map((product) => (
                <div key={product._id} className="col">
                  <div className="card h-100 shadow-sm">
                    <div className="position-relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <button
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem("cart", JSON.stringify([...cart, product]));
                          toast.success("Added to cart");
                        }}
                        className="btn btn-light position-absolute top-0 end-0 m-2"
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                    
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 text-primary mb-0">
                          ${product.price}
                        </span>
                        <button className="btn btn-outline-danger btn-sm">
                          <FiHeart />
                        </button>
                      </div>
                      <button
                        onClick={() => navigate(`/product/${product.slug}`)}
                        className="btn btn-outline-primary w-100"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li 
                    key={index + 1} 
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
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
