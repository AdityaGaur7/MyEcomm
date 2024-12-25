import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="container-fluid bg-light p-3 flex-row justify-content-between">
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <NavLink to="/" className="nav-link active" aria-current="page">
            Home
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            role="button"
            aria-expanded="false"
          >
            Pages
          </a>
          <ul className="dropdown-menu">
            <li>
              <NavLink to="/contact" className="dropdown-item">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="dropdown-item">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/policy" className="dropdown-item">
                Policy
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink to="/category" className="nav-link">
            Category
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link">
            Cart(0)
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
