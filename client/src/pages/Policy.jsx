import Layout from "../components/Layout/Layout";
import { FiShield, FiTruck, FiRefreshCw, FiLock } from "react-icons/fi";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"} description={"Privacy policy and terms"}>
      <div className="container py-5">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-md-8 mx-auto text-center">
            <h1 className="display-4 fw-bold mb-4">Our Policies</h1>
            <p className="lead text-muted">
              We value your privacy and are committed to protecting your personal information.
            </p>
          </div>
        </div>

        {/* Policy Highlights */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="text-primary mb-3">
                  <FiShield size={40} />
                </div>
                <h3 className="h5 mb-3">Secure Shopping</h3>
                <p className="text-muted mb-0">
                  Your payment information is always protected
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="text-primary mb-3">
                  <FiTruck size={40} />
                </div>
                <h3 className="h5 mb-3">Shipping Policy</h3>
                <p className="text-muted mb-0">
                  Fast and reliable delivery service
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="text-primary mb-3">
                  <FiRefreshCw size={40} />
                </div>
                <h3 className="h5 mb-3">Return Policy</h3>
                <p className="text-muted mb-0">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="text-primary mb-3">
                  <FiLock size={40} />
                </div>
                <h3 className="h5 mb-3">Privacy Protection</h3>
                <p className="text-muted mb-0">
                  Your data is always protected
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Policies */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="mb-5">
                  <h2 className="h3 mb-4">Privacy Policy</h2>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="h3 mb-4">Terms of Service</h2>
                  <p className="text-muted">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </p>
                </div>

                <div className="mb-5">
                  <h2 className="h3 mb-4">Shipping Information</h2>
                  <p className="text-muted">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                </div>

                <div>
                  <h2 className="h3 mb-4">Return & Refund Policy</h2>
                  <p className="text-muted mb-0">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui ratione
                    voluptatem sequi nesciunt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
