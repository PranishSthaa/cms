import React from 'react';
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const Front = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: "center"
            }}>
                <Navbar currentUser={currentUser} />
                <Outlet context={currentUser} />
                <Footer />
            </Box>
        </>
    )
}

export default Front