import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../ContextAPIS/CartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext); 
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const getproid = () => {
      axios
        .get(`http://localhost:3100/accessories/${id}`)
        .then((response) => {
          setProduct(response.data); 
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    };
    getproid();
  }, [id]); 

  if (!product) return <div>Loading...</div>; 

  const { price, description, title, image } = product;

  return (
    <div className="container">
      <div className="row" style={{ margin: "30px" }}>
        <div className="col-12">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>{title}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{description}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>${price}</td>
              </tr>
              <tr>
                <th>Image</th>
                <td>
                  <img
                    src={`/${image}`} 
                    alt={title}
                    style={{ height: "200px", width: "200px", objectFit: "cover" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-dark"
          style={{ width: "50%" }}
          onClick={() => addToCart(product)}
        >
          Add To Cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
            style={{ marginLeft: "10px" }}
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
