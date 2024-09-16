import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/Style.module.css";

const Admin = () => {
  const [product, setProduct] = useState({
    id: "",   
    title: "", 
    price: 0,
    category: "",
    description: "",  
    image: ""         
  });

  let navigate = useNavigate();

  // Redirect if not admin (without role)
  useEffect(() => {
    const role = localStorage.getItem("role");

    // If role is not admin, redirect to login
    if (role !== "admin") {
      navigate("/Login");
    }
  }, [navigate]);

  // Fetch product by id
  useEffect(() => {
    if (product.id) {
      axios
        .get(`http://localhost:3100/accessories/${product.id}`)
        .then((res) => {
          setProduct({
            ...product, 
            title: res.data.title, 
            price: res.data.price, 
            category: res.data.category,
            description: res.data.description,
            image: res.data.image
          });
        })
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [product.id]);

  // Count the total products (optional)
  useEffect(() => {
    axios.get("http://localhost:3100/accessories")
      .then((res) => {
        const productCount = res.data.length;
        console.log(`Total number of products: ${productCount}`);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Handle form input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduct((old) => ({
      ...old,
      [name]: value,
    }));
  }, []);

  // Handle adding a product
  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3100/accessories", product)
      .then((res) => {
        console.log("Product added:", res);
        navigate("/Getcategory");  
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  // Handle editing an existing product
  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3100/accessories/${product.id}`, product)
      .then((res) => {
        console.log("Product updated:", res);
        alert("Are you sure you want to update it?");
        navigate("/Getcategory");  
      })
      .catch((err) => console.error("Error editing product:", err));
  };

  // Handle deleting a product
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3100/accessories/${product.id}`)
      .then((res) => {
        console.log("Product deleted:", res);
        alert("Are you sure you want to delete it?");
        navigate("/Getcategory");  
      })
      .catch((err) => console.error("Error deleting product:", err));
  };

  return (
    <div className={`container`}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form className={styles.admin}>
            <div className="form-group">
              <label>Id</label>
              <input
                type="text"
                className="form-control "
                name="id"
                value={product.id}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={product.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="Perfume">Perfume</option>
                <option value="Necklaces">Necklaces</option>
                <option value="Bracelets">Bracelets</option>
                <option value="Earrings">Earrings</option>
                <option value="Ring">Ring</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                className="form-control"
                name="image"
                value={product.image}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-around" style={{ margin: "20px" }}>
              <button
                className="btn btn-dark"
                type="button"
                onClick={handleAdd}
                style={{ width: "150px" }}
              >
                Add
              </button>
              <button
                className="btn btn-primary ml-2"
                type="button"
                onClick={handleEdit}
                style={{ width: "150px" }}
                disabled={!product.id}  // Disable edit if no ID
              >
                Edit
              </button>
              <button
                className="btn btn-danger ml-2"
                type="button"
                onClick={handleDelete}
                style={{ width: "150px" }}
                disabled={!product.id}  // Disable delete if no ID
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
