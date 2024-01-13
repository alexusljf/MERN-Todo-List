import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./welcome.scss";

const Welcome = () => {
    return (
        <Box className = "welcomeMain">
            <Box className = "typographyBox">
                <Typography variant='h1' gutterBottom >
                    Welcome to the Todo List App!
                </Typography>
                <Typography variant='h3' gutterBottom>
                    This is my first MERN stack app! <br/>
                    Also my first time using Material UI!
                </Typography>
            </Box>
            
        </Box>
    );
};

export default Welcome;
