import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useParams, Link, Outlet } from 'react-router-dom';
import AuthService from "../../services/auth.service";

const Student = () => {
    const { id } = useParams();
    const [addMode, setAddMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    useEffect(() => {
        if (id) {
            setEditMode(true);
        } else {
            setEditMode(false);
        }
    }, [id]);
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
                            Students
                        </Typography>
                        {(currentUser.role.includes('ROLE_SUPERADMIN') || currentUser.role.includes('ROLE_ADMIN')) && <Box sx={{ m: 1 }}>
                            {addMode || editMode
                                ? <Button
                                    variant='outlined'
                                    component={Link}
                                    to=""
                                    color='error'
                                    onClick={() => {
                                        setAddMode(false);
                                        setEditMode(false);
                                    }}>Go Back
                                </Button>
                                : <Button
                                    variant='outlined'
                                    component={Link}
                                    to="add"
                                    color='primary'
                                    onClick={() => {
                                        setAddMode(true);
                                    }}>Add Student
                                </Button>
                            }
                        </Box>}
                    </Box>
                    <Outlet />
                </Container>
            </Box>
        </>
    )
}

export default Student