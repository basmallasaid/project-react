// Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../ContextAPIS/CartContext';
import styles from "../Styles/Style.module.css";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, calculateTotal } = useContext(CartContext);

  return (
    <div className={`container ${styles.cartcontainer}`}>
      <h1>Shopping Cart</h1>
      <div className="row">
        {cart.map((item) => (
          <div className="col-12 mb-3" key={item.id}>
            <div className={`d-flex align-items-center ${ styles.cartitem}`}>
              <img
                src={item.image}
                alt={item.title}
                style={{ height: '100px', width: '100px', objectFit: 'cover' }}
              />
              <div className={`${styles.cartitemdetails}`}>
                <h5>{item.title}</h5>
                <p>Price: ${item.price}</p>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-dark me-2"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="me-2">{item.quantity}</span>
                  <button
                    className="btn btn-dark"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`d-flex justify-content-end mt-4 ${styles.carttotal} `}>
        <h3 >Total: ${calculateTotal().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
