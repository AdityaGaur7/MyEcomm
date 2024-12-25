import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Reactapi } from "../../api";

const CreateProduct = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(""); // Selected category
  const [updateId, setUpdateId] = useState(null);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        console.log(data);
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  // Handle creating a new product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${Reactapi}/api/product/create-product`,
        { name, price, description, image, category }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
    }
  };

  // Handle updating an existing product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${Reactapi}/api/product/update-product/${updateId}`,
        { name, price, description, image, category }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Reactapi}/api/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setCategory(product.category); // Set selected category
    setUpdateId(product._id);
  };

  // Reset form fields
  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setCategory(""); // Reset selected category
    setUpdateId(null);
  };

  // Fetch products and categories on component mount
  useEffect(() => {
    getAllProducts();
    getAllCategories(); // Fetch categories
  }, []);

  return (
    <Layout
      title={"Manage Products"}
      description={"Create, Update, and Delete Products"}
    >
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2>All Products</h2>
          <form onSubmit={updateId ? handleUpdateProduct : handleCreateProduct}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {updateId ? "Update Product" : "Create Product"}
            </button>
          </form>

          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px" }}
                    />
                  </td>
                  <td>{item.category?.name}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditProduct(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
