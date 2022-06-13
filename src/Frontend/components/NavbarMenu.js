import { Box, Button } from '@mui/material';
import { Link } from "react-router-dom";
import React from 'react';

const NavbarMenu = () => {
    return (
        <Box sx={{ mx: "auto" }}>
            <Button component={Link} to="/" color='light'>Home</Button>
            <Button component={Link} to="/about" color='light'>About</Button>
            <Button component={Link} to="/contact" color='light'>Contact</Button>
        </Box>
    )
}

export default NavbarMenu