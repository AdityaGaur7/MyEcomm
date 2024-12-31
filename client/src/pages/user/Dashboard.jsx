import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";
import { FiPackage, FiHeart, FiMapPin, FiCreditCard } from "react-icons/fi";

const Dashboard = () => {
  const { auth } = useAuth();

  const stats = [
    {
      icon: <FiPackage />,
      title: "Total Orders",
      value: "12",
      color: "primary"
    },
    {
      icon: <FiHeart />,
      title: "Wishlist Items",
      value: "5",
      color: "danger"
    },
    {
      icon: <FiMapPin />,
      title: "Saved Addresses",
      value: "3",
      color: "success"
    },
    {
      icon: <FiCreditCard />,
      title: "Payment Methods",
      value: "2",
      color: "warning"
    }
  ];

  return (
    <Layout title="Dashboard" description="User Dashboard">
      <div className="user-layout">
        {/* Sidebar */}
        <div className="user-sidebar">
          <UserMenu />
        </div>

        {/* Main Content */}
        <div className="user-content">
          {/* Welcome Section */}
          <div className="user-card p-4 mb-4">
            <div className="d-flex align-items-center mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${auth?.user?.name}&background=random&size=100`}
                alt="Profile"
                className="rounded-circle me-4"
                style={{ width: "80px", height: "80px" }}
              />
              <div>
                <h2 className="mb-1">Welcome back, {auth?.user?.name}!</h2>
                <p className="text-muted mb-0">Here's what's happening with your account today.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="row g-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-md-3">
                  <div className={`user-stat-card bg-${stat.color}-subtle`}>
                    <div className={`stat-icon text-${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="h2 mb-1">{stat.value}</h3>
                      <p className="text-muted mb-0">{stat.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Information */}
          <div className="user-card p-4">
            <h4 className="mb-4">Profile Information</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="text-muted small">Full Name</label>
                  <p className="h5">{auth?.user?.name}</p>
                </div>
                <div className="mb-4">
                  <label className="text-muted small">Email Address</label>
                  <p className="h5">{auth?.user?.email}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="text-muted small">Phone Number</label>
                  <p className="h5">{auth?.user?.phone || 'Not provided'}</p>
                </div>
                <div className="mb-4">
                  <label className="text-muted small">Delivery Address</label>
                  <p className="h5">{auth?.user?.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
            <div className="d-flex gap-3">
              <button className="btn btn-primary">
                Edit Profile
              </button>
              <button className="btn btn-outline-primary">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
