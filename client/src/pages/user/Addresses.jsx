import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";
import { FiMapPin, FiPlus, FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";
import axios from "axios";
import { Reactapi } from "../../api";
import toast from "react-hot-toast";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { auth } = useAuth();
  
  const [formData, setFormData] = useState({
    type: "home",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    isDefault: false
  });

  const getAddresses = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/user/addresses`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data.success) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingId 
        ? `${Reactapi}/api/user/addresses/${editingId}`
        : `${Reactapi}/api/user/addresses`;
      
      const method = editingId ? axios.put : axios.post;
      
      const { data } = await method(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        getAddresses();
        resetForm();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error saving address");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${Reactapi}/api/user/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data.success) {
        toast.success("Address deleted");
        getAddresses();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting address");
    }
  };

  const resetForm = () => {
    setFormData({
      type: "home",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      isDefault: false
    });
    setEditingId(null);
    setShowForm(false);
  };

  useEffect(() => {
    if (auth?.token) getAddresses();
  }, [auth?.token]);

  return (
    <Layout title="Addresses" description="Manage Your Addresses">
      <div className="user-layout">
        <div className="user-sidebar">
          <UserMenu />
        </div>
        
        <div className="user-content">
          <div className="user-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="mb-1">My Addresses</h3>
                <p className="text-muted mb-0">
                  Manage your delivery addresses
                </p>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <FiPlus className="me-2" />
                Add New Address
              </button>
            </div>

            {showForm && (
              <div className="address-form mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      {editingId ? "Edit Address" : "Add New Address"}
                    </h5>
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Address Type</label>
                          <select 
                            className="form-select"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                          >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Street Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.street}
                            onChange={(e) => setFormData({...formData, street: e.target.value})}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.state}
                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Postal Code</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="defaultAddress"
                              checked={formData.isDefault}
                              onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                            />
                            <label className="form-check-label" htmlFor="defaultAddress">
                              Set as default address
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                              {editingId ? "Update Address" : "Save Address"}
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-light"
                              onClick={resetForm}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-5">
                <div className="display-1 text-muted mb-4">
                  <FiMapPin />
                </div>
                <h4>No addresses saved</h4>
                <p className="text-muted">
                  Add your delivery addresses to make checkout easier.
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {addresses.map((address) => (
                  <div key={address._id} className="col-md-6">
                    <div className="address-card card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <span className="badge bg-primary-subtle text-primary">
                            {address.type.toUpperCase()}
                          </span>
                          {address.isDefault && (
                            <span className="badge bg-success-subtle text-success">
                              <FiCheck className="me-1" />
                              Default
                            </span>
                          )}
                        </div>
                        <h5 className="card-title">{address.street}</h5>
                        <p className="card-text text-muted">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <div className="d-flex gap-2 mt-3">
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => {
                              setFormData(address);
                              setEditingId(address._id);
                              setShowForm(true);
                            }}
                          >
                            <FiEdit2 className="me-1" />
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(address._id)}
                          >
                            <FiTrash2 className="me-1" />
                            Delete
                          </button>
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

export default Addresses; 