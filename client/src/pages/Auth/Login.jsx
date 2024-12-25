import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { Reactapi } from "../../api";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {setAuth } = useAuth();


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
    <Layout title={"Login"} description={"Login"}>
      <div className="container col-md-4 offset-md-4 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div id="emailHelp" className="form-text">
              We will never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <p className="mt-3">
          Dont have an account?{" "}
          <NavLink to="/register" className="text-primary">
            Register
          </NavLink>
          </p>
      </div>
    </Layout>
  );
};

export default Login;
