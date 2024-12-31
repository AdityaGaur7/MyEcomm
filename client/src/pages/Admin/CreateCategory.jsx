import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Reactapi } from "../../api";
import { FiPlus, FiEdit2, FiTrash2, FiFolder } from "react-icons/fi";
import "../../styles/admin.css";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = updateId 
        ? `${Reactapi}/api/category/update-category/${updateId}`
        : `${Reactapi}/api/category/create-category`;
      
      const method = updateId ? axios.put : axios.post;
      const { data } = await method(endpoint, { name });

      if (data.success) {
        toast.success(data.message);
        getallCategory();
        setName("");
        setUpdateId(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error ${updateId ? 'updating' : 'creating'} category`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Reactapi}/api/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category");
    }
  };

  const handleEditCategory = (cat) => {
    setName(cat.name);
    setUpdateId(cat._id);
  };

  useEffect(() => {
    getallCategory();
  }, []);

  return (
    <Layout title="Manage Categories" description="Create, Update, and Delete Categories">
      <div className="admin-layout">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>

        <div className="admin-content">
          <div className="admin-card p-4 mb-4 fade-in">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="mb-1">Category Management</h3>
                <p className="text-muted mb-0">Manage your product categories</p>
              </div>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-light" 
                  onClick={() => {
                    setName("");
                    setUpdateId(null);
                  }}
                  disabled={!updateId}
                >
                  Cancel Edit
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="admin-card p-4">
                  <h5 className="mb-3">
                    {updateId ? "Update Category" : "Create New Category"}
                  </h5>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Category Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FiFolder />
                        </span>
                        <input
                          type="text"
                          className="form-control admin-form-control"
                          placeholder="Enter category name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                        <><FiEdit2 className="me-2" /> Update Category</>
                      ) : (
                        <><FiPlus className="me-2" /> Create Category</>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-md-8">
                <div className="admin-card p-4">
                  <h5 className="mb-3">Categories List</h5>
                  <div className="table-responsive">
                    <table className="table admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Created At</th>
                          <th>Products</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.map((cat) => (
                          <tr key={cat._id} className="align-middle">
                            <td>
                              <div className="d-flex align-items-center">
                                <FiFolder className="text-primary me-2" />
                                {cat.name}
                              </div>
                            </td>
                            <td>
                              {new Date(cat.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <span className="badge bg-light text-dark">
                                0 products
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEditCategory(cat)}
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteCategory(cat._id)}
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {category.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center py-4 text-muted">
                              No categories found
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
    </Layout>
  );
};

export default CreateCategory;
