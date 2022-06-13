import React, { useState } from 'react';
import { Box, Container, Typography, ListItem, Card, ListItemText, CardContent, List, Button, Grid, TextField } from '@mui/material';
import AuthService from "../../services/auth.service";
import UserManagementService from '../../services/userManagement.service';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmNewPass, setConfirmNewPass] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object().shape({
        oldPass: Yup.string().required("Old Password is required"),
        newPass: Yup.string().required("New Password is required"),
        confirmNewPass: Yup.string().required("Confirm New Password"),
    });
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

    const role = currentUser.role[0];
    const splitRole = role.split('_');
    const listItems = [{
        title: "Username",
        value: currentUser.username
    },
    {
        title: "Email",
        value: currentUser.email
    },
    {
        title: "Role",
        value: splitRole[1]
    }];

    const onSubmit = (data) => {
        setLoading(true);
        const oldPass = data.oldPass;
        const newPass = data.newPass;
        const confirmNewPass = data.confirmNewPass;
        if (newPass !== confirmNewPass) {
            setMessage("Confirm Password and New Password doesn't match");
            setLoading(false);
            return;
        } else {
            const sendPackage = {
                oldPass, newPass, userId: currentUser.id,
            };
            UserManagementService.changePassword(sendPackage).then(() => {
                setLoading(false);
                setShowForm(false);
                setMessage("Successfully updated password");
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        }
    }

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
                            Profile
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Card>
                            <Box sx={{ minWidth: 1050 }}>
                                <CardContent>
                                    {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                                    <List
                                        disablePadding>
                                        {listItems.map(listItem => (
                                            <ListItem
                                                key={listItem.title}
                                                divider
                                            >
                                                <ListItemText
                                                    primary={listItem.title}
                                                    sx={{ maxWidth: 400 }}
                                                >
                                                </ListItemText>
                                                <Box sx={{ textAlign: 'left' }}>
                                                    <Typography variant='body2'>{listItem.value}</Typography>
                                                </Box>
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Button
                                        variant='outlined'
                                        color={showForm ? 'error' : 'dark'}
                                        sx={{ mt: 1 }}
                                        onClick={() => setShowForm(!showForm)}
                                    >
                                        {showForm ? "Cancel" : "Change Password"}
                                    </Button>
                                    {showForm &&
                                        <Box>
                                            {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                                            <Grid container spacing={2}>
                                                <Grid item md={4} xs={6}>
                                                    <Controller
                                                        control={control}
                                                        name={'oldPass'}
                                                        defaultValue={""}
                                                        render={({ field }) => (
                                                            <TextField
                                                                {...field}
                                                                required
                                                                fullWidth
                                                                label={"Old Password"}
                                                                variant="outlined"
                                                                margin='dense'
                                                                color='dark'
                                                                size='small'
                                                                error={errors.oldPass ? true : false}
                                                            />
                                                        )}
                                                    />
                                                    <Typography variant="body2" color="error">
                                                        {errors.oldPass?.message}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={4} xs={6}>
                                                    <Controller
                                                        control={control}
                                                        name={'newPass'}
                                                        defaultValue={""}
                                                        render={({ field }) => (
                                                            <TextField
                                                                {...field}
                                                                required
                                                                fullWidth
                                                                label={"New Password"}
                                                                variant="outlined"
                                                                margin='dense'
                                                                color='dark'
                                                                size='small'
                                                                error={errors.newPass ? true : false}
                                                            />
                                                        )}
                                                    />
                                                    <Typography variant="body2" color="error">
                                                        {errors.newPass?.message}
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={4} xs={6}>
                                                    <Controller
                                                        control={control}
                                                        name={'confirmNewPass'}
                                                        defaultValue={""}
                                                        render={({ field }) => (
                                                            <TextField
                                                                {...field}
                                                                required
                                                                fullWidth
                                                                label={"Confirm New Password"}
                                                                variant="outlined"
                                                                margin='dense'
                                                                color='dark'
                                                                size='small'
                                                                error={errors.confirmNewPass ? true : false}
                                                            />
                                                        )}
                                                    />
                                                    <Typography variant="body2" color="error">
                                                        {errors.confirmNewPass?.message}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Button
                                                variant='outlined'
                                                color={(loading) ? 'warning' : 'success'}
                                                sx={{ my: 1.5 }}
                                                disabled={(loading) ? true : false}
                                                onClick={handleSubmit(onSubmit)}>
                                                {(loading) ? "Loading..." : "Submit"}
                                            </Button>
                                        </Box>}
                                </CardContent>
                            </Box>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default Profile