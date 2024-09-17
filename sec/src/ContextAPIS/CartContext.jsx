import React, { createContext, useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    if (userToken) {
      const savedCart = localStorage.getItem(`cart_${userToken}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart)); // Load user cart from localStorage
      }
    } else if (adminToken) {
      const savedCart = localStorage.getItem('admin_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart)); // Load admin cart from localStorage
      }
    } else {
      setCart([]); // Clear the cart if no user or admin is logged in
    }
  }, []); // Run only on component mount
  
  const updateLocalStorage = (cartItems) => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    if (userToken) {
      localStorage.setItem(`cart_${userToken}`, JSON.stringify(cartItems)); // Store user cart in localStorage
    } else if (adminToken) {
      localStorage.setItem('admin_cart', JSON.stringify(cartItems)); // Store admin cart in localStorage
    }
  };
  

  const addToCart = (product) => {
    const userToken = localStorage.getItem('userToken'); // Check if user is logged in

    if (!userToken) {
      // If user is not logged in, show login prompt
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to add items to your cart.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then(() => {
        // Redirect or show login prompt
        window.location.href = '/Login'; // Redirect to login page
      });
      return;
    }

    // If user is logged in, proceed with adding to cart
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        showSnackbar('Item quantity increased in cart!');
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
        showSnackbar('Item added to cart!');
      }
      updateLocalStorage(updatedCart); // Update localStorage
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      showSnackbar('Item removed from cart!');
      updateLocalStorage(updatedCart); // Update localStorage
      return updatedCart;
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      showSnackbar('Item quantity increased!');
      updateLocalStorage(updatedCart); // Update localStorage
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
      showSnackbar('Item quantity decreased!');
      updateLocalStorage(updatedCart); // Update localStorage
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const clearCart = () => {
    setCart([]); // Clear cart state
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      localStorage.removeItem(`cart_${userToken}`); // Remove the cart data for the user
    }
  };

  // Handle user logout
  const handleLogout = () => {
    clearCart(); // Clear the cart
    localStorage.removeItem('userToken'); // Remove user token
    localStorage.removeItem('adminToken'); // Remove admin token
    localStorage.removeItem('username'); // Remove username or any other user-related data
    window.location.href = '/Login'; // Redirect to login page
  };
  

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, calculateTotal, clearCart, handleLogout }}
    >
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  );
};
