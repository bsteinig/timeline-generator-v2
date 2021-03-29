import React from 'react'
import '../App.css';

const Navbar = ({user}) => {
    // const user = useContext(UserContext)
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand brand-custom" href="/">
            Timeline JS Generator Tool
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link link-custom" aria-current="page" href="/create">
                  Create
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-custom" href="/view">
                  View
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-custom" href="/import">
                  Import
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                {user ? 
                  <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle dropdown-custom"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <span className="log-tag">Welcome Back, <span className="username">{user.displayName}</span></span>
                        <img alt="user profile" className="propic" src={user.photoURL}width="35" height="35"/>
                    </a>
                    <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                    >
                        <li>
                        <a className="dropdown-item" href="/logout">
                            Logout
                        </a>
                      </li>
                  </ul>
                </li>
                :
                <li className="nav-item">
                    <a className="nav-link" href="/login">
                    Login
                    </a>
                </li>
                }   
            </ul>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;

// name === undefined