import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { Reactapi } from "../../api";
import toast from "react-hot-toast";
import { useCart } from "../../Context/cart";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const { cart, setCart } = useCart();

  const getWishlist = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/user/wishlist`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await axios.delete(`${Reactapi}/api/user/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data.success) {
        toast.success("Removed from wishlist");
        getWishlist();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing from wishlist");
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart");
  };

  useEffect(() => {
    if (auth?.token) getWishlist();
  }, [auth?.token]);

  return (
    <Layout title="Wishlist" description="Your Wishlist">
      <div className="user-layout">
        <div className="user-sidebar">
          <UserMenu />
        </div>
        
        <div className="user-content">
          <div className="user-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="mb-1">My Wishlist</h3>
                <p className="text-muted mb-0">
                  {wishlist.length} items saved for later
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : wishlist.length === 0 ? (
              <div className="text-center py-5">
                <div className="display-1 text-muted mb-4">
                  <FiHeart />
                </div>
                <h4>Your wishlist is empty</h4>
                <p className="text-muted">
                  Save items you love to your wishlist and review them anytime.
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {wishlist.map((product) => (
                  <div key={product._id} className="col-md-6 col-lg-4">
                    <div className="product-card h-100">
                      <div className="position-relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="card-img-top product-image"
                        />
                        <div className="product-overlay">
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-light btn-sm"
                              onClick={() => addToCart(product)}
                            >
                              <FiShoppingCart className="me-1" />
                              Add to Cart
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => removeFromWishlist(product._id)}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-truncate mb-1">
                          {product.name}
                        </h5>
                        <p className="text-muted small mb-2">
                          {product.category?.name}
                        </p>
                        <p className="card-text text-truncate mb-3">
                          {product.description}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="h5 mb-0">${product.price}</span>
                          <span className="badge bg-success">In Stock</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist; 