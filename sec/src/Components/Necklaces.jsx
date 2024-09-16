import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../ContextAPIS/CartContext";

const Necklaces = () => {
  const { addToCart } = useContext(CartContext); // Access CartContext for adding items to the cart
  const [todos, setTodos] = useState([]); // State to hold the fetched data
  const [min, setMin] = useState(0); // State to handle pagination min
  const [max, setMax] = useState(6); // State to handle pagination max

  // Fetch data when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3100/accessories")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTodos(res.data); // Store data in state
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Handle next page of items
  const nextToDos = () => {
    const totalItems = todos.filter((item) => item.category === "Necklaces").length;
    const newMin = min + 6;
    const newMax = max + 6;
    
    if (newMin >= totalItems) {
      setMin(0); // Reset to the beginning when you reach the end
      setMax(6);
    } else {
      setMin(newMin);
      setMax(newMax);
    }
  };

  // Handle previous page of items
  const prevToDos = () => {
    setMin(Math.max(min - 6, 0));
    setMax(Math.max(max - 6, 6));
  };

  // Filter the items by category "Necklaces"
  const filteredTodos = todos.filter((item) => item.category === "Necklaces");

  return (
    <div className="container">
      <div className="row" style={{ margin: "30px" }}>
        {filteredTodos.slice(min, max).map((item) => (
          <div
            className="col-sm-12 col-md-4 col-lg-3 mb-4"
            key={item.id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              className="card"
              style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}
            >
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column" style={{ flex: 1 }}>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Price: ${item.price}</p>
                <Link
                  className="btn btn-light mt-auto"
                  to={`/Getcategory/${item.id}`}
                  style={{ margin: "3px 0px" }}
                >
                  See More
                </Link>
                <button
                  className="btn btn-dark"
                  onClick={() => addToCart(item)} // Add item to the cart
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mb-4">
        <button
          className="btn btn-dark"
          onClick={prevToDos}
          disabled={min === 0} // Disable when on the first page
        >
          Previous
        </button>
        <button className="btn btn-dark" onClick={nextToDos}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Necklaces;
