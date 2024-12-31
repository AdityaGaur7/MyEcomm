import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Reactapi } from "../../api";
import { FiPlus, FiEdit2, FiTrash2, FiImage, FiDollarSign, FiBox, FiTag, FiFileText } from "react-icons/fi";
import "../../styles/admin.css";

const CreateProduct = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });
  const [loading, setLoading] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = updateId
        ? `${Reactapi}/api/product/update-product/${updateId}`
        : `${Reactapi}/api/product/create-product`;
      
      const method = updateId ? axios.put : axios.post;
      const { data } = await method(endpoint, formData);

      if (data.success) {
        toast.success(data.message);
        getAllProducts();
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error ${updateId ? 'updating' : 'creating'} product`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axios.delete(`${Reactapi}/api/product/delete-product/${id}`);
        if (data.success) {
          toast.success(data.message);
          getAllProducts();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error deleting product");
      }
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    });
    setUpdateId(product._id);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: ""
    });
    setUpdateId(null);
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Layout title="Manage Products" description="Create, Update, and Delete Products">
      <div className="admin-layout">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 admin-sidebar">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-content">
              <div className="admin-card p-4 mb-4 fade-in">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="mb-1">Product Management</h3>
                    <p className="text-muted mb-0">Create and manage your products</p>
                  </div>
                  <button 
                    className="btn btn-light"
                    onClick={resetForm}
                    disabled={!updateId}
                  >
                    Cancel Edit
                  </button>
                </div>

                <div className="row">
                  <div className="col-lg-4">
                    <div className="admin-card p-4">
                      <h5 className="mb-4">{updateId ? "Update Product" : "Create New Product"}</h5>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label className="form-label">Product Name</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FiBox />
                            </span>
                            <input
                              type="text"
                              name="name"
                              className="form-control admin-form-control"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Enter product name"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Price</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FiDollarSign />
                            </span>
                            <input
                              type="number"
                              name="price"
                              className="form-control admin-form-control"
                              value={formData.price}
                              onChange={handleInputChange}
                              placeholder="Enter price"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FiTag />
                            </span>
                            <select
                              name="category"
                              className="form-control admin-form-control"
                              value={formData.category}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select Category</option>
                              {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Image URL</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FiImage />
                            </span>
                            <input
                              type="text"
                              name="image"
                              className="form-control admin-form-control"
                              value={formData.image}
                              onChange={handleInputChange}
                              placeholder="Enter image URL"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="form-label">Description</label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <FiFileText />
                            </span>
                            <textarea
                              name="description"
                              className="form-control admin-form-control"
                              value={formData.description}
                              onChange={handleInputChange}
                              rows="4"
                              placeholder="Enter product description"
                              required
                            />
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          className="btn btn-primary w-100"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="spinner-border spinner-border-sm me-2" />
                          ) : updateId ? (
                            <><FiEdit2 className="me-2" /> Update Product</>
                          ) : (
                            <><FiPlus className="me-2" /> Create Product</>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <div className="admin-card p-4">
                      <h5 className="mb-4">Products List</h5>
                      <div className="table-responsive">
                        <table className="table admin-table">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Category</th>
                              <th>Price</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.map((item) => (
                              <tr key={item._id} className="align-middle">
                                <td>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="rounded"
                                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                    />
                                    <div className="ms-3">
                                      <h6 className="mb-0">{item.name}</h6>
                                      <small className="text-muted">{item.description.substring(0, 30)}...</small>
                                    </div>
                                  </div>
                                </td>
                                <td>{item.category?.name}</td>
                                <td>${item.price}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => handleEditProduct(item)}
                                    >
                                      <FiEdit2 />
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => handleDeleteProduct(item._id)}
                                    >
                                      <FiTrash2 />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {product.length === 0 && (
                              <tr>
                                <td colSpan="4" className="text-center py-4 text-muted">
                                  No products found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
