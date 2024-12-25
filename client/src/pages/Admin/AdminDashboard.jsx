import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../Context/auth";
const AdminDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title={"AdminDashboard"} description={"AdminDashboard"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-3">
            <AdminMenu />
          </div>
          <div className="col-9">
            <div className="card w-75 p-3">
              <h4> Name:{auth?.user?.name}</h4>
              <h4> Email:{auth?.user?.email}</h4>
              <h4> Contact:{auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
