import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Reactapi } from "../api";
import { toast } from "react-hot-toast";
import { useCart } from "../Context/cart";
import { FiShoppingCart, FiHeart, FiTruck, FiShield, FiCheck, FiStar } from "react-icons/fi";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${Reactapi}/api/product/get-product/${slug}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={product?.name} description={product?.description}>
      <div className="bg-light py-5">
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#" className="text-decoration-none">Products</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product?.name}
              </li>
            </ol>
          </nav>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="row g-0">
                {/* Product Image */}
                <div className="col-md-6 position-relative">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="img-fluid rounded-start"
                    style={{ height: '600px', width: '100%', objectFit: 'cover' }}
                  />
                  <button 
                    className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle p-2"
                    onClick={() => toast.success("Added to wishlist")}
                  >
                    <FiHeart size={20} />
                  </button>
                </div>

                {/* Product Details */}
                <div className="col-md-6">
                  <div className="p-4 p-md-5">
                    <h1 className="display-6 fw-bold mb-4">{product?.name}</h1>
                    
                    {/* Ratings */}
                    <div className="mb-4">
                      <div className="d-flex align-items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar key={star} className="text-warning" fill="#ffc107" />
                        ))}
                        <span className="text-muted ms-2">(50 Reviews)</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="h2 fw-bold text-primary">${product?.price}</span>
                      <span className="text-muted text-decoration-line-through ms-3">
                        ${(product?.price * 1.2).toFixed(2)}
                      </span>
                      <span className="badge bg-danger ms-3">20% OFF</span>
                    </div>

                    {/* Description */}
                    <p className="lead text-muted mb-4">
                      {product?.description}
                    </p>

                    {/* Features */}
                    <div className="row g-4 mb-4">
                      {[
                        { icon: <FiTruck />, title: "Free Delivery", text: "Orders over $100" },
                        { icon: <FiShield />, title: "2 Year Warranty", text: "100% Genuine" },
                        { icon: <FiCheck />, title: "Money Back", text: "30-day guarantee" }
                      ].map((feature, index) => (
                        <div key={index} className="col-md-4">
                          <div className="d-flex align-items-center">
                            <div className="text-primary me-3">
                              {feature.icon}
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1">{feature.title}</h6>
                              <small className="text-muted">{feature.text}</small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quantity */}
                    <div className="mb-4">
                      <label className="form-label fw-bold">Quantity</label>
                      <div className="input-group" style={{ width: '140px' }}>
                        <button className="btn btn-outline-secondary">-</button>
                        <input type="text" className="form-control text-center" value="1" readOnly />
                        <button className="btn btn-outline-secondary">+</button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="d-grid gap-2 d-md-flex">
                      <button 
                        onClick={handleAddToCart}
                        className="btn btn-primary btn-lg flex-grow-1"
                      >
                        <FiShoppingCart className="me-2" />
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => navigate('/cart')}
                        className="btn btn-outline-primary btn-lg"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="row mt-5">
            <div className="col-12">
              <ul className="nav nav-tabs" id="productTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link active" 
                    data-bs-toggle="tab" 
                    data-bs-target="#description"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link" 
                    data-bs-toggle="tab" 
                    data-bs-target="#specifications"
                  >
                    Specifications
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link" 
                    data-bs-toggle="tab" 
                    data-bs-target="#reviews"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <div className="tab-content p-4 bg-white shadow-sm" id="productTabContent">
                <div className="tab-pane fade show active" id="description">
                  <p className="text-muted">{product?.description}</p>
                </div>
                <div className="tab-pane fade" id="specifications">
                  <table className="table table-striped mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">Brand</th>
                        <td>Premium Brand</td>
                      </tr>
                      <tr>
                        <th scope="row">Model</th>
                        <td>2024 Edition</td>
                      </tr>
                      <tr>
                        <th scope="row">Warranty</th>
                        <td>2 Years</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane fade" id="reviews">
                  <p className="text-muted">No reviews yet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
