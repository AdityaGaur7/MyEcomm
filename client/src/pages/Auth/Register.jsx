import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { Reactapi } from "../../api";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiHelpCircle } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Reactapi}/api/auth/register`, formData);
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Register Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register"} description={"Create a new account"}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">Create Account</h2>
                  <p className="text-muted">Join our community today</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Name Input */}
                    <div className="col-12">
                      <label className="form-label">
                        <FiUser className="me-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="col-12">
                      <label className="form-label">
                        <FiMail className="me-2" />
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <div className="col-12">
                      <label className="form-label">
                        <FiLock className="me-2" />
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        required
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="col-12">
                      <label className="form-label">
                        <FiPhone className="me-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {/* Security Question */}
                    <div className="col-12">
                      <label className="form-label">
                        <FiHelpCircle className="me-2" />
                        Security Question
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        placeholder="What is your favorite color?"
                        required
                      />
                    </div>

                    {/* Address Input */}
                    <div className="col-12">
                      <label className="form-label">
                        <FiMapPin className="me-2" />
                        Address
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Enter your address"
                        required
                      />
                    </div>

                    {/* Terms Checkbox */}
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="terms"
                          required
                        />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the{" "}
                          <a href="#" className="text-decoration-none">
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100 btn-lg">
                        Create Account
                      </button>
                    </div>
                  </div>
                </form>

                <p className="text-center mt-4">
                  Already have an account?{" "}
                  <NavLink to="/login" className="text-decoration-none">
                    Sign in
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
