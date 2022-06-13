import { Box, Container, Paper, Typography, TextField, Button, Divider } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from '../../services/auth.service';

const Login = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required")
    });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (data) => {
        setMessage("");
        setLoading(true);
        AuthService.login(data.username, data.password).then(() => {
            setLoading(false);
            navigate("/dashboard");
            window.location.reload();
        }, (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setLoading(false);
            setMessage(resMessage);
        });
    };
    return (
        <>
            <Container sx={{ my: 1 }}>
                <Box sx={{ width: 1, height: 1, mx: 'auto' }}>
                    <Paper variant='outlined' sx={{ mt: '15%', mx: 'auto', p: 1, textAlign: 'center', width: 1 / 3, border: 'none' }}>
                        <Typography variant='h4' component='h1' sx={{ mb: 1 }}>
                            Login
                        </Typography>
                        {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                        <TextField
                            required
                            fullWidth
                            id='username'
                            name='username'
                            label="Username"
                            variant="outlined"
                            margin='dense'
                            color='dark'
                            size='small'
                            {...register('username') || ""}
                            error={errors.username ? true : false}
                        />
                        <Typography variant="body2" color="error">
                            {errors.username?.message}
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            id='password'
                            name='password'
                            label="Password"
                            type='password'
                            variant="outlined"
                            margin='dense'
                            color='dark'
                            size='small'
                            {...register('password') || ""}
                            error={errors.password ? true : false}
                        />
                        <Typography variant="body2" color="error">
                            {errors.password?.message}
                        </Typography>
                        <Button
                            variant='outlined'
                            color='dark' sx={{ my: 1.5 }}
                            disabled={(loading) ? true : false}
                            onClick={handleSubmit(handleLogin)}>
                            {(loading) ? "Loading..." : "Login"}
                        </Button>
                        <Divider><Typography variant='body2' component='p' >Not Registered?</Typography></Divider>
                        <Box>
                            <Button variant='text' href="#" underline="hover" color='dark' component={Link} to="/signup">
                                Register Now
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    )
}

export default Login