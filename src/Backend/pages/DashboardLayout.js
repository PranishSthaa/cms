import React from 'react';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280
    }
}));

const DashboardLayout = ({ user }) => {
    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <Outlet context={user} />
                </Box>
            </DashboardLayoutRoot>
            <Navbar />
            <Sidebar user={user} />
        </>
    )
}

export default DashboardLayout