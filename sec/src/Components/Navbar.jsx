import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../ContextAPIS/CartContext';
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
  const { cart, handleLogout } = useContext(CartContext); 
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  // Get the adminToken and username from localStorage
  const adminToken = localStorage.getItem("adminToken");

  // Handle user logout
  const logout = () => {
    handleLogout(); 
    navigate("/Login"); 
  };

  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); 
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/Getcategory" style={{ letterSpacing: "2px" }}>
          Essence
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Perfume">
                Perfume
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Accessories
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/Necklaces">Necklace</Link></li>
                <li><Link className="dropdown-item" to="/Bracelet">Bracelet</Link></li>
                <li><Link className="dropdown-item" to="/Earrings">Earrings</Link></li>
                <li><Link className="dropdown-item" to="/Ring">Ring</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            {adminToken && ( 
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/AdminDashboard">
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {username ? ( 
            <>
              <span className="navbar-text me-3">
                Welcome, {username}
              </span>
              <button
                className="btn btn-outline-light"
                onClick={logout}
                style={{ justifySelf: "right", margin: "0px 15px" }}
              >
                Logout
              </button>
            </>
          ) : ( 
            <Link className="btn btn-outline-light" type="submit" style={{ justifySelf: "right", margin: "0px 15px" }} to="/Login">
              Login
            </Link>
          )}
          
          <Link to="/Cart" className="btn btn-outline-light" type="submit" style={{ position: 'relative' }}>
            Cart {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
              style={{
                color: 'white',
                width: '20px',
                height: '20px',
                fontSize: '12px',
                position: 'absolute',
                top: '-5px',
                right: '-10px',
              }}>
              {cart.length}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
