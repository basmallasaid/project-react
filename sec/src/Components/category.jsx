import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../ContextAPIS/CartContext";

function Getcategory() {
  const { addToCart } = useContext(CartContext); 
  const [todos, setTodos] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(6);

  useEffect(() => {
    axios
      .get("http://localhost:3100/accessories")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const shuffledData = shuffleArray(res.data);
          setTodos(shuffledData);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const nextToDos = () => {
    const newMin = min + 6;
    const newMax = max + 6;
    const totalItems = todos.length;
    if (newMin >= totalItems) {
      setMin(0);
      setMax(6);
    } else {
      setMin(newMin);
      setMax(newMax);
    }
  };

  const prevToDos = () => {
    setMin(Math.max(min - 6, 0));
    setMax(Math.max(max - 6, 6));
  };

  return (
    <div className="container">
      <div className="row" style={{ margin: "30px" }}>
        {todos.slice(min, max).map((item) => (
          <div className="col-sm-12 col-md-4 col-lg-3 mb-4" key={item.id} style={{ display: "flex", justifyContent: "center" }}>
            <div className="card" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
              <img src={item.image} className="card-img-top" alt={item.title} style={{ height: "300px", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column" style={{ flex: 1 }}>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Price: ${item.price}</p>
                <Link className="btn btn-light mt-auto" to={`/Getcategory/${item.id}`} style={{ margin: "3px 0px" }}>See More</Link>
                <button className="btn btn-dark" onClick={() => addToCart(item)}>Add To Cart</button> {/* استدعاء addToCart */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-dark" onClick={prevToDos} disabled={min === 0}>Previous</button>
        <button className="btn btn-dark" onClick={nextToDos}>Next</button>
      </div>
    </div>
  );
}

export default Getcategory;
