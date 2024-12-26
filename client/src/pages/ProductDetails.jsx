import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { Reactapi } from "../api";
import { toast } from "react-hot-toast";
import { useCart } from "../Context/cart";
const ProductDetails = () => {
  const { slug } = useParams(); // Get slug from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cart, setCart } = useCart();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${Reactapi}/api/product/get-product/${slug}`
        );
        const data = await response.json(); // Ensure to parse the response

        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <Layout title={product.name} description={product.description}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h1 className="display-4">{product.name}</h1>
            <p className="lead">{product.description}</p>
            <h3 className="text-success">${product.price}</h3>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Product Added to Cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
