import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";
import { FiCreditCard, FiPlus, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { Reactapi } from "../../api";
import toast from "react-hot-toast";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    isDefault: false
  });

  const getPaymentMethods = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/user/payment-methods`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (data.success) {
        setPaymentMethods(data.paymentMethods);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching payment methods");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${Reactapi}/api/user/payment-methods`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Payment method added successfully");
        getPaymentMethods();
        resetForm();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding payment method");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Reactapi}/api/user/payment-methods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Payment method removed");
        getPaymentMethods();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing payment method");
    }
  };

  const resetForm = () => {
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: false
    });
    setShowForm(false);
  };

  useEffect(() => {
    if (auth?.token) getPaymentMethods();
  }, [auth?.token]);

  return (
    <Layout title="Payment Methods" description="Manage Your Payment Methods">
      <div className="user-layout">
        <div className="user-sidebar">
          <UserMenu />
        </div>
        
        <div className="user-content">
          <div className="user-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="mb-1">Payment Methods</h3>
                <p className="text-muted mb-0">
                  Manage your saved payment methods
                </p>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <FiPlus className="me-2" />
                Add Payment Method
              </button>
            </div>

            {showForm && (
              <div className="payment-form mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Add New Card</h5>
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label">Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({
                              ...formData,
                              cardNumber: e.target.value
                            })}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label">Card Holder Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            value={formData.cardHolder}
                            onChange={(e) => setFormData({
                              ...formData,
                              cardHolder: e.target.value
                            })}
                            required
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Expiry Month</label>
                          <select
                            className="form-select"
                            value={formData.expiryMonth}
                            onChange={(e) => setFormData({
                              ...formData,
                              expiryMonth: e.target.value
                            })}
                            required
                          >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }, (_, i) => {
                              const month = (i + 1).toString().padStart(2, '0');
                              return (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Expiry Year</label>
                          <select
                            className="form-select"
                            value={formData.expiryYear}
                            onChange={(e) => setFormData({
                              ...formData,
                              expiryYear: e.target.value
                            })}
                            required
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 10 }, (_, i) => {
                              const year = (new Date().getFullYear() + i).toString();
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">CVV</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="123"
                            maxLength="4"
                            value={formData.cvv}
                            onChange={(e) => setFormData({
                              ...formData,
                              cvv: e.target.value
                            })}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="defaultCard"
                              checked={formData.isDefault}
                              onChange={(e) => setFormData({
                                ...formData,
                                isDefault: e.target.checked
                              })}
                            />
                            <label className="form-check-label" htmlFor="defaultCard">
                              Set as default payment method
                            </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                              Add Card
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
            ) : paymentMethods.length === 0 ? (
              <div className="text-center py-5">
                <div className="display-1 text-muted mb-4">
                  <FiCreditCard />
                </div>
                <h4>No payment methods saved</h4>
                <p className="text-muted">
                  Add a payment method to make checkout faster.
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {paymentMethods.map((method) => (
                  <div key={method._id} className="col-md-6">
                    <div className="payment-card card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center">
                            <FiCreditCard className="text-primary me-2" size={24} />
                            <h5 className="card-title mb-0">
                              •••• {method.cardNumber.slice(-4)}
                            </h5>
                          </div>
                          {method.isDefault && (
                            <span className="badge bg-success-subtle text-success">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="card-text text-muted mb-1">
                          {method.cardHolder}
                        </p>
                        <p className="card-text text-muted small">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                        <div className="mt-3">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(method._id)}
                          >
                            <FiTrash2 className="me-1" />
                            Remove
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

export default PaymentMethods; 