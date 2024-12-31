import { FaShoppingBag, FaTruck, FaHeadset, FaArrowRight } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import Layout from '../components/Layout/Layout';

const About = () => {
  const features = [
    {
      icon: <FaShoppingBag size={40} />,
      title: "Curated Selection",
      description: "Handpicked premium products from trusted brands worldwide"
    },
    {
      icon: <FaTruck size={40} />,
      title: "Express Delivery",
      description: "Swift delivery with real-time tracking and updates"
    },
    {
      icon: <RiSecurePaymentLine size={40} />,
      title: "Secure Transactions",
      description: "Bank-grade encryption for worry-free shopping"
    },
    {
      icon: <FaHeadset size={40} />,
      title: "Premium Support",
      description: "Dedicated team ready to assist you 24/7"
    }
  ];

  return (
    <Layout title="About Us | Your Premium Shopping Destination" description="Learn about our mission, values, and commitment to excellence">
      {/* Hero Section */}
      <div className="bg-dark text-white position-relative overflow-hidden">
        <div className="position-absolute w-100 h-100" style={{
          background: 'linear-gradient(45deg, #1a237e, #311b92)',
          opacity: 0.9
        }}></div>
        <div className="container position-relative py-5">
          <div className="row min-vh-50 align-items-center py-5">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-3 fw-bold mb-4">Redefining Online Shopping</h1>
              <p className="lead mb-4 opacity-90">
                Experience the future of e-commerce with our innovative platform. 
                Where quality meets convenience, and style meets satisfaction.
              </p>
              <button className="btn btn-outline-light btn-lg px-5">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose Us</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              We combine technology with exceptional service to deliver an unmatched shopping experience
            </p>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="h4 mb-3">{feature.title}</h3>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src="/about-image.jpg" 
                alt="Our Story" 
                className="img-fluid rounded-3 shadow"
                style={{ objectFit: 'cover', height: '400px', width: '100%' }}
              />
            </div>
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">Our Journey</h2>
              <p className="lead text-muted mb-4">
                Since our inception in 2024, we've been driven by a singular vision: to create the most 
                trusted and innovative e-commerce platform.
              </p>
              <p className="text-muted mb-4">
                Our journey is marked by continuous innovation, unwavering commitment to quality, 
                and a deep understanding of our customers' needs.
              </p>
              <button className="btn btn-primary btn-lg d-inline-flex align-items-center">
                Discover More
                <FaArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row g-4">
            {[
              { number: "100K+", label: "Active Users" },
              { number: "50K+", label: "Products" },
              { number: "99%", label: "Satisfaction" },
              { number: "150+", label: "Countries" }
            ].map((stat, index) => (
              <div key={index} className="col-6 col-md-3 text-center">
                <div className="display-4 fw-bold mb-2">{stat.number}</div>
                <p className="h5 mb-0 opacity-75">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Leadership Team</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Meet the people who make it all possible
            </p>
          </div>
          
          <div className="row g-4">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm text-center">
                  <div className="card-body p-4">
                    <img 
                      src={`/team-member-${member}.jpg`}
                      alt={`Team Member ${member}`}
                      className="rounded-circle mb-4"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    <h5 className="mb-1">John Doe</h5>
                    <p className="text-muted small mb-3">Position</p>
                    <div className="d-flex justify-content-center gap-2">
                      {['linkedin', 'twitter'].map((social) => (
                        <a key={social} href="#" className="btn btn-light btn-sm rounded-circle">
                          <i className={`bi bi-${social}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-4">Ready to Get Started?</h2>
              <p className="lead text-muted mb-4">
                Join thousands of satisfied customers who trust our platform
              </p>
              <button className="btn btn-primary btn-lg px-5">
                Start Shopping Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;