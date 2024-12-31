import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-4">About Us</h5>
            <p className="text-muted">
              We are dedicated to providing the best shopping experience with quality products
              and excellent customer service.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-white hover-primary">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-white hover-primary">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-white hover-primary">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-white hover-primary">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-muted text-decoration-none hover-primary">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-muted text-decoration-none hover-primary">Contact</a>
              </li>
              <li className="mb-2">
                <a href="/policy" className="text-muted text-decoration-none hover-primary">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="/terms" className="text-muted text-decoration-none hover-primary">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Contact Info</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-3 d-flex align-items-center">
                <FiMapPin className="me-2" /> 123 Street, New York, USA
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FiPhone className="me-2" /> +1 234 567 8900
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FiMail className="me-2" /> info@example.com
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4">Newsletter</h5>
            <p className="text-muted">Subscribe to our newsletter for updates and exclusive offers.</p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email"
                aria-label="Your email"
              />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <img 
              src="/payment-methods.png" 
              alt="Payment Methods" 
              className="img-fluid" 
              style={{ maxHeight: "30px" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;