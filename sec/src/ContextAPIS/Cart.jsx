import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../ContextAPIS/CartContext';
import { useNavigate } from 'react-router-dom'; // For redirection
import Swal from 'sweetalert2';
import { Snackbar, Alert } from '@mui/material';
import styles from "../Styles/Style.module.css";

const Cart = () => {
  const { cart, setCart, increaseQuantity, decreaseQuantity, removeFromCart, calculateTotal, clearCart } = useContext(CartContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  
  const userToken = localStorage.getItem('userToken'); 
  const userEmail = localStorage.getItem('userEmail'); 

 
  useEffect(() => {
    if (userEmail) {
      const savedCart = localStorage.getItem(`cart_${userEmail}`);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart); 
          }
        } catch (error) {
          console.error("Error parsing cart data from localStorage:", error);
        }
      }
    }
  }, [userEmail, setCart]);

 
  useEffect(() => {
    if (userEmail && cart.length > 0) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart)); 
    } else if (userEmail && cart.length === 0) {
      localStorage.removeItem(`cart_${userEmail}`); 
    }
  }, [cart, userEmail]);

 
  const handleCheckout = () => {
    if (!userToken) {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to proceed with checkout',
        icon: 'warning',
        confirmButtonText: 'Login'
      }).then(() => {
        navigate('/Login'); 
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to proceed with the payment?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          const totalAmount = calculateTotal().toFixed(2);
          setSnackbarMessage(`Invoice Total: $${totalAmount}. Transaction successful.`);
          setSnackbarOpen(true);

         
          clearCart(); 
          localStorage.removeItem(`cart_${userEmail}`); 
        }
      });
    }
  };

  const handleRemoveFromCart = (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this item from the cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(itemId); 
        setSnackbarMessage('Item removed from cart.');
        setSnackbarOpen(true);
      }
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className={`container ${styles.cartcontainer}`}>
      {cart.length === 0 ? (
        <div className={`d-flex flex-column align-items-center ${styles.emptyCart}`}>
          <img
            src="/empty-cart.png"
            alt="Empty Cart"
            className={styles.emptyCartImage}
          />
          <h3>Your cart is empty!</h3>
        </div>
      ) : (
        <div className={`${styles.cartTable}`}>
          <div className={`${styles.tableHeader}`}>
            <div className={`${styles.tableCell}`}>Product</div>
            <div className={`${styles.tableCell}`}>Price</div>
            <div className={`${styles.tableCell}`}>Quantity</div>
            <div className={`${styles.tableCell}`}>Actions</div>
          </div>
          {cart.map((item) => (
            <div className={`${styles.tableRow}`} key={item.id}>
              <div className={`${styles.tableCell}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ height: '100px', width: '100px', objectFit: 'cover' }}
                />
                {"  "} {item.title}
              </div>
              <div className={`${styles.tableCell}`}>${item.price}</div>
              <div className={`${styles.tableCell}`}>
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
              </div>
              <div className={`${styles.tableCell}`}>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className={`d-flex justify-content-end mt-4 ${styles.carttotal}`}>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
