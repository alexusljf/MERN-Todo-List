import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography, Box } from "@mui/material";
import './layout.scss';

  // array of links for the side drawer
  const menuItems = [
    { 
      text: 'Home', 
      icon: <HomeIcon color="primary" />, 
      path: '/' 
    },
    { 
      text: 'Todos', 
      icon: <MenuIcon color="primary" />, 
      path: '/list' 
    },
    { 
      text: 'Create Todo', 
      icon: <AddIcon color="primary" />, 
      path: '/create' 
    },
  ];

  export default function Layout({ children }) {
    const location = useLocation()
  
    return (
      <div className="root">
        <Drawer
          className="drawer"
          variant="permanent"
          anchor="left"
          classes={{ paper: "drawerPaper" }}
        >
          <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
            <Box>
              <Typography variant="h5" className="title">
                Todo List
              </Typography>
              <List>
                {menuItems.map(item => (
                  <ListItem key={item.text} className={location.pathname == item.path ? "active" : null}>
                    <ListItemButton component={NavLink} to={item.path}>
                      <ListItemIcon className="listIcon">
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
  
            <Box>
                <Box className = "buttonBox">
                    <a href="https://github.com/alexusljf" target="_blank">
                        <GitHubIcon color="primary" fontSize="large"/>
                    </a>
                    <a href="https://www.linkedin.com/in/alexuslim/" target="_blank">
                        <LinkedInIcon color="primary" fontSize="large"/>
                    </a>
                </Box>
            </Box>
          </Box>
        </Drawer>
        <div className={location.pathname == "/" ? "welcomePage" : "page"}>
          {children}
        </div>
      </div>
    )
  }