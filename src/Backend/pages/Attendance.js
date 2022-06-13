import React from 'react'
import { Box, Container, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Attendance = () => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1
                        }}>
                        <Typography
                            sx={{ m: 1 }}
                            variant="h4"
                        >
                            Attendance
                        </Typography>
                    </Box>
                    <Outlet />
                </Container>
            </Box>
        </>
    )
}

export default Attendance