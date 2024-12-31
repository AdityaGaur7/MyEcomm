import { NavLink } from "react-router-dom";
import { 
  FiUser, 
  FiShoppingBag, 
  FiHeart, 
  FiMapPin, 
  FiSettings,
  FiCreditCard
} from "react-icons/fi";
import "../../styles/user.css";

const UserMenu = () => {
  const menuItems = [
    {
      path: "/dashboard/user",
      icon: <FiUser size={18} />,
      title: "Profile Overview"
    },
    {
      path: "/dashboard/user/orders",
      icon: <FiShoppingBag size={18} />,
      title: "My Orders"
    },
    {
      path: "/dashboard/user/wishlist",
      icon: <FiHeart size={18} />,
      title: "Wishlist"
    },
    {
      path: "/dashboard/user/addresses",
      icon: <FiMapPin size={18} />,
      title: "Addresses"
    },
    {
      path: "/dashboard/user/payments",
      icon: <FiCreditCard size={18} />,
      title: "Payment Methods"
    }
  ];

  return (
    <div className="user-menu">
      <div className="user-menu-header mb-4">
        <h3 className="text-white mb-1">My Account</h3>
        <p className="text-white-50 small mb-0">Manage your profile and orders</p>
      </div>

      <div className="user-menu-items">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              user-menu-item
              ${isActive ? 'active' : ''}
            `}
          >
            <span className="user-menu-icon">{item.icon}</span>
            <span className="user-menu-title">{item.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="user-menu-footer mt-auto">
        <NavLink to="/dashboard/user/settings" className="user-menu-item">
          <span className="user-menu-icon">
            <FiSettings size={18} />
          </span>
          <span className="user-menu-title">Account Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;