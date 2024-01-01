import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material";
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
        <div className= "root">
            <Drawer
                className= "drawer"
                variant="permanent"
                anchor="left"
                classes={{ paper: "drawerPaper" }}
            >
                <Typography variant="h5" className= "title">
                    Todo List
                </Typography>
                <List>
                    {menuItems.map(item => (
                        <ListItem key={item.text} className={location.pathname == item.path ? "active" : null}>
                            <ListItemButton component = {NavLink} to = {item.path}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className= "page">
                {children}
            </div>
        </div>
    )
}