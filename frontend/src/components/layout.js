import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { makeStyles } from "@mui/styles";
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography } from "@mui/material";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
    page: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: 0,
      background: '#f9f9f9',
      width: '100%',
      minHeight: `calc(100vh - ${theme.spacing(3)})`
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
        padding: theme.spacing(2),
    }
  }})

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
  const classes = useStyles()
    
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <Typography variant="h5" className={classes.title}>
                    Todo List
                </Typography>
                <List>
                    {menuItems.map(item => (
                        <ListItem key={item.text} className={location.pathname == item.path ? classes.active : null}>
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
            <div className={classes.page}>
                {children}
            </div>
        </div>
    )
}