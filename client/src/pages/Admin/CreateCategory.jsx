import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Reactapi } from "../../api";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const getallCategory = async () => {
    try {
      const { data } = await axios.get(`${Reactapi}/api/category/get-category`);
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${Reactapi}/api/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(data.message);
        getallCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating category");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${Reactapi}/api/category/update-category/${updateId}`,
        { name }
      );
      if (data.success) {
        toast.success(data.message);
        getallCategory();
        setName("");

        setUpdateId(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating category");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Reactapi}/api/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getallCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category");
    }
  };

  const handleEditCategory = (cat) => {
    setName(cat.name);
    setUpdateId(cat._id);
  };

  useEffect(() => {
    getallCategory();
  }, []);

  return (
    <Layout
      title={"Manage Categories"}
      description={"Create, Update, and Delete Categories"}
    >
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2>All Categories</h2>
          <form
            onSubmit={updateId ? handleUpdateCategory : handleCreateCategory}
          >
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {updateId ? "Update Category" : "Create Category"}
            </button>
          </form>

          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Name</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.name}</td>

                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditCategory(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteCategory(cat._id)}
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

export default CreateCategory;
