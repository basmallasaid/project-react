import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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

  
  useEffect(() => {
    const role = localStorage.getItem("role");

    
    if (role !== "admin") {
      navigate("/Login");
    }
  }, [navigate]);

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

  
  useEffect(() => {
    axios.get("http://localhost:3100/accessories")
      .then((res) => {
        const productCount = res.data.length;
        console.log(`Total number of products: ${productCount}`);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProduct((old) => ({
      ...old,
      [name]: value,
    }));
  }, []);

  
  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3100/accessories", product)
      .then((res) => {
        Swal.fire('Success', 'Product added successfully', 'success');
        navigate("/Getcategory");  
      })
      .catch((err) => Swal.fire('Error', 'Error adding product', 'error'));
  };

  
  const handleEdit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to update this product.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:3100/accessories/${product.id}`, product)
          .then((res) => {
            Swal.fire('Updated!', 'Product has been updated.', 'success');
            navigate("/Getcategory");  
          })
          .catch((err) => Swal.fire('Error', 'Error updating product', 'error'));
      }
    });
  };

  // Handle deleting a product
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3100/accessories/${product.id}`)
          .then((res) => {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            navigate("/Getcategory");  
          })
          .catch((err) => Swal.fire('Error', 'Error deleting product', 'error'));
      }
    });
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
                disabled={!product.id}  
              >
                Edit
              </button>
              <button
                className="btn btn-danger ml-2"
                type="button"
                onClick={handleDelete}
                style={{ width: "150px" }}
                disabled={!product.id}  
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
