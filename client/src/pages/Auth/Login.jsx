import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Reactapi } from "../../api";
import { useAuth } from "../../Context/auth";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Reactapi}/api/auth/login`, formData);
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login"} description={"Login to your account"}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">Welcome Back</h2>
                  <p className="text-muted">Please sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      <FiMail className="me-2" />
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <FiLock className="me-2" />
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember-me"
                      />
                      <label className="form-check-label" htmlFor="remember-me">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none p-0"
                      onClick={() => navigate("/forgotpassword")}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 btn-lg mb-4">
                    Sign in
                  </button>

                  <div className="text-center">
                    <p className="text-muted mb-4">Or continue with</p>
                    <div className="row g-3">
                      <div className="col">
                        <button type="button" className="btn btn-outline-secondary w-100">
                          <img src="/google.svg" alt="Google" className="me-2" height="20" />
                          Google
                        </button>
                      </div>
                      <div className="col">
                        <button type="button" className="btn btn-outline-secondary w-100">
                          <img src="/facebook.svg" alt="Facebook" className="me-2" height="20" />
                          Facebook
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <p className="text-center mt-4">
                  Don't have an account?{" "}
                  <NavLink to="/register" className="text-decoration-none">
                    Sign up
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

export default Login;
