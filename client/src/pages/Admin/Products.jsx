import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Reactapi } from "../../api";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import "../../styles/admin.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/product/get-product`);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredProducts = products.filter(prod => 
    prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Products" description="Manage Products">
      <div className="admin-layout">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Header Section */}
          <div className="admin-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="mb-1">Products Management</h3>
                <p className="text-muted mb-0">Manage and organize your products</p>
              </div>
              <div className="d-flex gap-3">
                <NavLink to="/dashboard/admin/create-product" className="btn btn-primary">
                  <FiPlus className="me-2" />
                  Add New Product
                </NavLink>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="row g-3">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <FiSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <button className="btn btn-light w-100">
                  <FiFilter className="me-2" />
                  Filter Products
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {filteredProducts.map((prod) => (
                <div key={prod._id} className="col-xl-3 col-lg-4 col-md-6">
                  <div className="admin-card product-card h-100">
                    <div className="position-relative">
                      <img
                        src={prod.image}
                        className="card-img-top product-image"
                        alt={prod.name}
                      />
                      <div className="product-overlay">
                        <NavLink 
                          to={`/dashboard/admin/product/${prod.slug}`}
                          className="btn btn-light btn-sm"
                        >
                          View Details
                        </NavLink>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-truncate mb-1">{prod.name}</h5>
                      <p className="text-muted small mb-2">
                        {prod.category?.name || 'Uncategorized'}
                      </p>
                      <p className="card-text text-truncate mb-3">
                        {prod.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">${prod.price}</span>
                        <span className="badge bg-success">In Stock</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-12 text-center py-5">
                  <div className="text-muted">
                    <h4>No products found</h4>
                    <p>Try adjusting your search or add new products</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
