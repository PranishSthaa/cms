import React, { useState } from 'react';
import { Typography, Paper, ListItemIcon, TextField, Button, Box } from '@mui/material';
import { FaPaperPlane } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';



const ContactForm = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").matches(/^[a-z ,.'-]+$/i, { message: "Only alphabetical values are accepted.", excludeEmptyString: true }),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        message: Yup.string().required("Message is required")
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

    const btnIcon = <Box>
        <ListItemIcon sx={{ color: 'dark.main', minWidth: "20px" }}><FaPaperPlane /></ListItemIcon>Send
    </Box>;
    return (
        <Paper variant='outlined' sx={{ p: 1 }}>
            <Typography variant='h3' component='h1' sx={{ mb: 1 }}>Send Message</Typography>
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
                size="small"
                {...register("name") || ""}
                error={errors.name ? true : false}
            />
            <Typography variant="body2" color="error">
                {errors.name?.message}
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
                size="small"
                {...register("email") || ""}
                error={errors.name ? true : false}
            />
            <Typography variant="body2" color="error">
                {errors.email?.message}
            </Typography>
            <TextField
                required
                fullWidth
                id="message"
                name="message"
                label="Message"
                variant="outlined"
                margin='dense'
                multiline
                rows={3}
                color='dark'
                {...register("message") || ""}
                error={errors.message ? true : false}
            />
            <Typography variant="body2" color="error">
                {errors.message?.message}
            </Typography>
            <Button
                variant='outlined'
                color='dark'
                sx={{ mt: 1 }}
                onClick={handleSubmit(handleForm)}
                disabled={(loading) ? true : false}>
                {(loading)
                    ? "Loading..."
                    : btnIcon
                }
            </Button>
        </Paper>
    )
}

export default ContactForm