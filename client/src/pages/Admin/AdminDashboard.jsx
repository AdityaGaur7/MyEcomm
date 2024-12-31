import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../Context/auth";
import { FiUsers, FiPackage, FiDollarSign, FiTruck, FiTrendingUp, FiClock } from "react-icons/fi";
import "../../styles/admin.css";

const AdminDashboard = () => {
  const { auth } = useAuth();

  const stats = [
    { icon: <FiUsers />, title: "Total Users", value: "1,234", trend: "+12%" },
    { icon: <FiPackage />, title: "Products", value: "567", trend: "+5%" },
    { icon: <FiDollarSign />, title: "Revenue", value: "$12,345", trend: "+8%" },
    { icon: <FiTruck />, title: "Orders", value: "89", trend: "+15%" }
  ];

  const recentActivities = [
    { id: 1, title: "New Order #1234", time: "2 minutes ago", type: "order" },
    { id: 2, title: "Product Stock Update", time: "1 hour ago", type: "inventory" },
    { id: 3, title: "New User Registration", time: "3 hours ago", type: "user" }
  ];

  return (
    <Layout title="Admin Dashboard" description="Admin Control Panel">
      <div className="admin-layout">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Welcome Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Welcome back, {auth?.user?.name}</h2>
              <p className="text-muted mb-0">Here's what's happening with your store today.</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-light">
                <FiClock className="me-2" />
                Last 7 Days
              </button>
              <button className="btn btn-primary">
                <FiTrendingUp className="me-2" />
                View Reports
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-xl-3 col-md-6">
                <div className="stats-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="stats-icon">
                        {stat.icon}
                      </div>
                      <h6 className="mt-4 mb-1">{stat.title}</h6>
                      <h3 className="mb-0">{stat.value}</h3>
                    </div>
                    <div className="trend-badge">
                      {stat.trend}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4">
            {/* Profile Card */}
            <div className="col-md-4">
              <div className="admin-card h-100">
                <div className="text-center p-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${auth?.user?.name}&background=random&size=100`}
                    alt="Profile"
                    className="rounded-circle mb-3"
                  />
                  <h4 className="mb-1">{auth?.user?.name}</h4>
                  <p className="text-muted mb-4">Administrator</p>
                  <div className="d-grid">
                    <button className="btn btn-outline-primary">
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div className="border-top p-4">
                  <div className="mb-3">
                    <label className="text-muted d-block mb-1">Email</label>
                    <span>{auth?.user?.email}</span>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted d-block mb-1">Phone</label>
                    <span>{auth?.user?.phone}</span>
                  </div>
                  <div>
                    <label className="text-muted d-block mb-1">Role</label>
                    <span className="badge bg-success">Administrator</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="col-md-8">
              <div className="admin-card h-100">
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom">
                  <h4 className="mb-0">Recent Activity</h4>
                  <button className="btn btn-link text-decoration-none">View All</button>
                </div>
                <div className="p-4">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className={`activity-item d-flex align-items-center ${
                        index !== recentActivities.length - 1 ? 'mb-4' : ''
                      }`}
                    >
                      <div className={`activity-icon ${activity.type}`}>
                        {activity.type === 'order' && <FiTruck />}
                        {activity.type === 'inventory' && <FiPackage />}
                        {activity.type === 'user' && <FiUsers />}
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1">{activity.title}</h6>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                      <button className="btn btn-light btn-sm">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
