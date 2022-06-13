import React, { useState } from 'react'
import { Button, Box, Card, CardContent, TextField, Typography, CardHeader, Grid, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import UserManagementService from '../../../services/userManagement.service';

const UserManagementForm = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required").matches(/^[a-z ,.'-]+$/i, { message: "Only alphabetical values are accepted.", excludeEmptyString: true }),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().required("Password is required"),
        role: Yup.string().required("Role is required"),
    });
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
    const initialUserState = {
        id: null,
        username: '',
        email: '',
        password: '',
        role: ''
    }
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onError = (errors, e) => console.log(errors, e);
    const onSubmit = (data) => {
        // console.log(data);
        setMessage("");
        setLoading(true);
        UserManagementService.createUser(data).then(() => {
            setLoading(false);
            navigate("/dashboard/usermanagement");
            window.location.reload();
        }, (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            setLoading(false);
            setMessage(resMessage);
        });
    }

    const inputField = (name, defaultValue, error, label) => {
        return <Grid item md={4} xs={6}>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue || ""}
                render={({ field }) => (
                    <TextField
                        {...field}
                        required
                        fullWidth
                        label={label}
                        variant="outlined"
                        margin='dense'
                        color='dark'
                        size='small'
                        error={error ? true : false}
                    />
                )}
            />
            <Typography variant="body2" color="error">
                {error?.message}
            </Typography>
        </Grid>
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Card>
                <Box sx={{ minWidth: 1050 }}>
                    <CardHeader
                        title={'Create User'}
                    />
                    <CardContent>
                        {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                        <Grid container spacing={2}>
                            {inputField("username", currentUser.username, errors.username, "Username")}
                            {inputField("email", currentUser.email, errors.email, "Email")}
                            {inputField("password", currentUser.password, errors.password, "Password")}
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='role'
                                    defaultValue={""}
                                    render={({ field }) => (
                                        <>
                                            <TextField
                                                {...field}
                                                select
                                                fullWidth
                                                required
                                                label='Role'
                                                variant='outlined'
                                                margin='dense'
                                                color='dark'
                                                size='small'
                                                error={errors.role ? true : false}
                                            >
                                                <MenuItem value="accountant">Accountant</MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                                <MenuItem value="teacher">Teacher</MenuItem>
                                            </TextField>
                                        </>
                                    )}
                                />
                                <Typography variant="body2" color="error">
                                    {errors.role?.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            variant='outlined'
                            color={(loading) ? 'warning' : 'success'}
                            sx={{ my: 1.5 }}
                            disabled={(loading) ? true : false}
                            onClick={handleSubmit(onSubmit, onError)}>
                            {(loading) ? "Loading..." : "Submit"}
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}

export default UserManagementForm