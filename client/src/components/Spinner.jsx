import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setcount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prev) => --prev);
    }, 1000);

    if (count === 0)
      navigate("/login", {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div>
      <div className="d-flex flex-column justify-content-center">
        <h1>Redirecting in {count} seconds</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
