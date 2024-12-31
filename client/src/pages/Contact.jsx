import Layout from "../components/Layout/Layout";
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiSend } from "react-icons/fi";
import '../styles/custom.css';

const Contact = () => {
  return (
    <Layout title={"Contact Us"} description={"Contact us for any queries"}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h1 className="display-4 fw-bold mb-4">Get in Touch</h1>
              <p className="lead opacity-90">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-4">
            <div className="custom-card card h-100 shadow-custom p-4">
              <div className="card-body">
                <h3 className="h4 mb-4 section-header text-center">Contact Info</h3>
                
                {[
                  {
                    icon: <FiMapPin size={24} />,
                    title: "Our Location",
                    content: "123 Business Avenue, New York, NY 10001",
                  },
                  {
                    icon: <FiPhone size={24} />,
                    title: "Phone Number",
                    content: "+1 (555) 123-4567",
                  },
                  {
                    icon: <FiMail size={24} />,
                    title: "Email Address",
                    content: "support@yourstore.com",
                  },
                ].map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-4 hover-scale">
                    <div className="icon-circle flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="ms-3">
                      <h5 className="fs-6 fw-bold mb-1">{item.title}</h5>
                      <p className="text-muted mb-0">{item.content}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-5">
                  <h5 className="text-center mb-4">Follow Us</h5>
                  <div className="d-flex justify-content-center gap-3">
                    {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                      <a key={social} href={`#${social}`} 
                         className="btn btn-light rounded-circle p-2 hover-scale">
                        <img src={`/${social}.svg`} alt={social} width="24" height="24" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="custom-card card shadow-custom">
              <div className="card-body p-4 p-md-5">
                <h3 className="h4 mb-4 section-header text-center">Send a Message</h3>
                
                <form className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">First Name</label>
                    <input type="text" className="custom-form-control form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input type="text" className="custom-form-control form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <input type="email" className="custom-form-control form-control" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone</label>
                    <input type="tel" className="custom-form-control form-control" />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Subject</label>
                    <input type="text" className="custom-form-control form-control" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea 
                      className="custom-form-control form-control" 
                      rows="5" 
                      required
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn-custom-primary btn-lg">
                      <FiSend className="me-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="custom-card card shadow-custom overflow-hidden">
              <div className="card-body p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25986652089843!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1644332472909!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
