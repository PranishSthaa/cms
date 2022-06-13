import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const SignupForm = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").matches(/^[a-z ,.'-]+$/i, { message: "Only alphabetical values are accepted.", excludeEmptyString: true }),
        contact: Yup.string().required("Contact number is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        institutionName: Yup.string().required("Institution name is required"),
        institutionAddress: Yup.string().required("Institution Address is required")
    });
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleForm = (data) => {
        setMessage("");
        setLoading(true);
        console.log(data);
        setLoading(false);
        setMessage("Success");
    }
    return (
        <Box>
            {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
            <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                margin='dense'
                color='dark'
                size='small'
                {...register("name") || ""}
                error={errors.name ? true : false}
            />
            <Typography variant="body2" color="error">
                {errors.name?.message}
            </Typography>
            <TextField
                required
                fullWidth
                id="contact"
                name="contact"
                label="Contact"
                variant="outlined"
                margin='dense'
                color='dark'
                size='small'
                {...register("contact") || ""}
                error={errors.contact ? true : false}
            />
            <Typography variant="body2" color="error">
                {errors.contact?.message}
            </Typography>
            <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin='dense'
                color='dark'
                size='small'
                {...register("email") || ""}
                error={errors.email ? true : false}
            />
            <Typography variant="body2" color="error">
                {errors.email?.message}
            </Typography>
            <TextField
                required
                fullWidth
                id="institutionName"
                name="institutionName"
                label="Institution Name"
                variant="outlined"
                margin='dense'
                color='dark'
                size='small'
                {...register("institutionName") || ""}
                error={errors.institutionName ? true : false}
            />
            <Typography variant="body2" color="error">
                {errors.institutionName?.message}
            </Typography>
            <TextField
                required
                fullWidth
                id="institutionAddress"
                name="institutionAddress"
                label="Institution Address"
                variant="outlined"
                margin='dense'
                color='dark'
                size='small'
                {...register("institutionAddress") || ""}
                error={errors.institutionAddress ? true : false}
            />
            <Typography variant="body2" color="error">
                {errors.institutionAddress?.message}
            </Typography>
            <Box sx={{ mx: "auto", textAlign: "center" }}>
                <Button
                    variant='outlined'
                    color='dark'
                    sx={{ my: 1.5 }}
                    onClick={handleSubmit(handleForm)}
                    disabled={(loading) ? true : false}
                >
                    {(loading)
                        ? "Loading..."
                        : "Send"
                    }
                </Button>
            </Box>
        </Box>
    )
}

export default SignupForm