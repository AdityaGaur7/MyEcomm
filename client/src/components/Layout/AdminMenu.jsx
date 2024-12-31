import { NavLink } from "react-router-dom";
import { 
  FiGrid, 
  FiBox, 
  FiPlusSquare, 
  FiPackage, 
  FiUsers, 
  FiShoppingBag,
  FiSettings
} from "react-icons/fi";
import "../../styles/admin.css";

const AdminMenu = () => {
  const menuItems = [
    {
      path: "/dashboard/admin",
      icon: <FiGrid size={18} />,
      title: "Dashboard"
    },
    {
      path: "/dashboard/admin/create-category",
      icon: <FiPlusSquare size={18} />,
      title: "Categories"
    },
    {
      path: "/dashboard/admin/create-product",
      icon: <FiBox size={18} />,
      title: "Add Product"
    },
    {
      path: "/dashboard/admin/products",
      icon: <FiPackage size={18} />,
      title: "Products"
    },
    {
      path: "/dashboard/admin/orders",
      icon: <FiShoppingBag size={18} />,
      title: "Orders"
    },
    {
      path: "/dashboard/admin/users",
      icon: <FiUsers size={18} />,
      title: "Users"
    }
  ];

  return (
    <div className="admin-menu">
      {/* Admin Header */}
      <div className="admin-menu-header mb-4">
        <h3 className="text-white mb-1">Admin Panel</h3>
        <p className="text-white-50 small mb-0">Store Management</p>
      </div>

      {/* Menu Items */}
      <div className="admin-menu-items">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              admin-menu-item
              ${isActive ? 'active' : ''}
            `}
          >
            <span className="admin-menu-icon">{item.icon}</span>
            <span className="admin-menu-title">{item.title}</span>
          </NavLink>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="admin-menu-footer mt-auto">
        <NavLink to="/dashboard/admin/settings" className="admin-menu-item">
          <span className="admin-menu-icon">
            <FiSettings size={18} />
          </span>
          <span className="admin-menu-title">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
