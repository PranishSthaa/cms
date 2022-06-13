import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardContent, TextField, Typography, CardHeader, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DepartmentService from '../../../services/department.service';

const DepartmentForm = () => {
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string()
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

    const initialDepartmentState = {
        id: null,
        name: "",
        description: ""
    }
    const [currentDepartment, setCurrentDepartment] = useState(initialDepartmentState);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            DepartmentService.getDepartment(id).then(response => {
                const department = response.data;
                const fields = ['name', 'description'];
                fields.forEach(field => setValue(field, department[field]));
                setCurrentDepartment(department);
                setEditMode(true);
            })
        }
    }, [id, setValue]);

    const onSubmit = (data) => {
        setMessage("");
        setLoading(true);
        if (editMode) {
            DepartmentService.updateDepartment(id, data).then(() => {
                setLoading(false);
                navigate("/dashboard/departments");
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            DepartmentService.createDepartment(data).then(() => {
                setLoading(false);
                navigate("/dashboard/departments");
                window.location.reload();
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        }
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Card>
                <Box sx={{ minWidth: 1050 }}>
                    <CardHeader
                        title={id ? "Edit Department" : "Add Department"}
                    />
                    <CardContent>
                        {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    control={control}
                                    name='name'
                                    defaultValue={currentDepartment.name || ""}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            label="Name"
                                            variant="outlined"
                                            margin='dense'
                                            color='dark'
                                            size='small'
                                            error={errors.name ? true : false}
                                        />
                                    )}
                                />
                                <Typography variant="body2" color="error">
                                    {errors.name?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    control={control}
                                    name='description'
                                    defaultValue={currentDepartment.description || ""}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Description"
                                            variant="outlined"
                                            margin='dense'
                                            color='dark'
                                            size='small'
                                            multiline
                                            rows={3}
                                            error={errors.description ? true : false}
                                        />
                                    )}
                                />

                                <Typography variant="body2" color="error">
                                    {errors.description?.message}
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
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}

export default DepartmentForm