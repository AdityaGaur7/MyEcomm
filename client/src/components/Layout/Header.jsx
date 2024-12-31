import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { useCart } from "../../Context/cart";
import toast from "react-hot-toast";
import { FiShoppingCart, FiUser, FiLogOut, FiHome, FiGrid, FiInfo, FiPhone, FiFileText } from "react-icons/fi";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold text-primary">
          <img src="/logo.png" alt="Logo" height="30" className="me-2" />
          E-Commerce
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link d-flex align-items-center">
                <FiHome className="me-1" /> Home
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                data-bs-toggle="dropdown"
                role="button"
              >
                <FiGrid className="me-1" /> Pages
              </a>
              <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm">
                <li>
                  <NavLink to="/about" className="dropdown-item d-flex align-items-center">
                    <FiInfo className="me-2" /> About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="dropdown-item d-flex align-items-center">
                    <FiPhone className="me-2" /> Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/policy" className="dropdown-item d-flex align-items-center">
                    <FiFileText className="me-2" /> Policy
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/cart" className="nav-link d-flex align-items-center">
                <FiShoppingCart className="me-1" />
                Cart
                {cart?.length > 0 && (
                  <span className="badge bg-primary rounded-pill ms-1">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </li>

            {!auth.user ? (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link btn btn-primary text-white px-3 py-2 ms-2">
                  <FiUser className="me-1" /> Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  data-bs-toggle="dropdown"
                  role="button"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${auth?.user?.name}&background=random`}
                    alt="Profile"
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                  {auth?.user?.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm">
                  <li>
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                      className="dropdown-item d-flex align-items-center"
                    >
                      <FiGrid className="me-2" /> Dashboard
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <NavLink
                      to="/login"
                      className="dropdown-item d-flex align-items-center text-danger"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="me-2" /> Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
