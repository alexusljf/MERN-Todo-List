import React from "react";
import {NavLink} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareGithub} from '@fortawesome/free-brands-svg-icons'

const NavBar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style ={{marginBottom: '14px'}}>
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
                <Button variant="primary">Home</Button>
            </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/list">
                    Todos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">
                    Create Todo
                </NavLink>
              </li>
              </ul>
              <ul className="navbar-nav">
              <li className="nav-item">
                <a class="nav-link" href="https://github.com/alexusljf" target="_blank">
                    <FontAwesomeIcon icon={faSquareGithub} style = {{fontSize: "36px"}}/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavBar;