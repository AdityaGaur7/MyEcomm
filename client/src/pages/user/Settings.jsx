import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../Context/auth";
import { FiBell, FiLock, FiShield, FiGlobe } from "react-icons/fi";
import toast from "react-hot-toast";

const Settings = () => {
  const { auth } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    twoFactorAuth: false,
    language: "en",
    currency: "USD"
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success("Setting updated successfully");
  };

  return (
    <Layout title="Settings" description="Account Settings">
      <div className="user-layout">
        <div className="user-sidebar">
          <UserMenu />
        </div>
        
        <div className="user-content">
          <div className="user-card p-4">
            <h3 className="mb-4">Account Settings</h3>

            {/* Notifications Section */}
            <div className="settings-section mb-4">
              <h5 className="d-flex align-items-center mb-3">
                <FiBell className="me-2" /> Notifications
              </h5>
              <div className="card">
                <div className="card-body">
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Email Notifications</h6>
                      <p className="text-muted small mb-0">
                        Receive emails about your account activity
                      </p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={() => handleToggle('emailNotifications')}
                      />
                    </div>
                  </div>
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Order Updates</h6>
                      <p className="text-muted small mb-0">
                        Get notifications about your order status
                      </p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={settings.orderUpdates}
                        onChange={() => handleToggle('orderUpdates')}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Promotional Emails</h6>
                      <p className="text-muted small mb-0">
                        Receive emails about promotions and deals
                      </p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={settings.promotions}
                        onChange={() => handleToggle('promotions')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="settings-section mb-4">
              <h5 className="d-flex align-items-center mb-3">
                <FiShield className="me-2" /> Security
              </h5>
              <div className="card">
                <div className="card-body">
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Two-Factor Authentication</h6>
                      <p className="text-muted small mb-0">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={() => handleToggle('twoFactorAuth')}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-outline-primary">
                      <FiLock className="me-2" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="settings-section">
              <h5 className="d-flex align-items-center mb-3">
                <FiGlobe className="me-2" /> Preferences
              </h5>
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Language</label>
                    <select 
                      className="form-select"
                      value={settings.language}
                      onChange={(e) => setSettings({
                        ...settings,
                        language: e.target.value
                      })}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Currency</label>
                    <select 
                      className="form-select"
                      value={settings.currency}
                      onChange={(e) => setSettings({
                        ...settings,
                        currency: e.target.value
                      })}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings; 