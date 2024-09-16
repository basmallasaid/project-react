import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../ContextAPIS/CartContext";

const Bracelet = () => {
  const { addToCart } = useContext(CartContext); // Access the CartContext
  const [todos, setTodos] = useState([]); // State for storing fetched data
  const [min, setMin] = useState(0); // State for pagination
  const [max, setMax] = useState(6); // State for pagination

  useEffect(() => {
    axios
      .get("http://localhost:3100/accessories")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTodos(res.data); // Store fetched data in state
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []); // Empty dependency array means this effect runs once on mount

  const nextToDos = () => {
    setMin((prevMin) => {
      const newMin = prevMin + 6;
      const newMax = newMin + 6;
      const totalItems = todos.filter((item) => item.category === "Bracelet").length;

      if (newMin >= totalItems) {
        return { min: 0, max: 6 }; // Reset to initial if out of bounds
      }

      setMax(newMax);
      return newMin;
    });
  };

  const prevToDos = () => {
    setMin((prevMin) => {
      const newMin = Math.max(prevMin - 6, 0);
      const newMax = newMin + 6;
      setMax(newMax);
      return newMin;
    });
  };

  const filteredTodos = todos.filter((item) => item.category === "Bracelet");

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
                  See more
                </Link>
                <button
                  className="btn btn-dark"
                  onClick={() => addToCart(item)}
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
          disabled={min === 0}
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

export default Bracelet;
