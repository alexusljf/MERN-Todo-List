import React from "react";
import {NavLink} from "react-router-dom";
import { IconButton, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';

const NavBar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style ={{marginBottom: '14px'}}>
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
                <Button 
                variant="contained"
                startIcon={<HomeIcon />}
                size="medium"
                >
                  Home
                </Button>
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
                <IconButton href="https://github.com/alexusljf" target="_blank">
                    <GitHubIcon />
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavBar;