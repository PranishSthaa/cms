import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardContent, TextField, Typography, CardHeader, Grid, RadioGroup, FormLabel, FormControlLabel, Radio, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TeacherService from '../../../services/teacher.service';
import DepartmentService from '../../../services/department.service';
import UserManagementService from '../../../services/userManagement.service';

const TeacherForm = () => {
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").matches(/^[a-z ,.'-]+$/i, { message: "Only alphabetical values are accepted.", excludeEmptyString: true }),
        contact: Yup.string().required("Contact number is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        address: Yup.string().required("Address is required"),
        gender: Yup.string().required("Gender is required"),
        join_date: Yup.string().required("Join date is required"),
        // image: Yup.string(),
        description: Yup.string(),
        department: Yup.string().required("Department is required"),
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
    const initialTeacherState = {
        id: null,
        name: "",
        contact: "",
        email: "",
        address: "",
        gender: "",
        join_date: "",
        image: "",
        description: "",
        Department: {},
    }
    const [currentTeacher, setCurrentTeacher] = useState(initialTeacherState);
    const [departments, setDepartments] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        DepartmentService.getAllDepartments().then(response => {
            setDepartments(response.data);
        })
        if (id) {
            TeacherService.getTeacher(id).then(response => {
                const teacher = response.data;
                const fields = ['name', 'contact', 'email', 'address', 'gender', 'join_date', 'image', 'description'];
                fields.forEach(field => setValue(field, teacher[field]));
                setValue('department', teacher.Department.name);
                setCurrentTeacher(teacher);
                setEditMode(true);
            })
        }
    }, [id, setValue]);

    const onSubmit = (data) => {
        setMessage("");
        setLoading(true);
        if (editMode) {
            TeacherService.updateTeacher(id, data).then(() => {
                setLoading(false);
                navigate("/dashboard/teachers");
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            TeacherService.createTeacher(data).then((response) => {
                const createdTeacher = response.data.teacher;
                const username = createdTeacher.name.replace(/\s/g, "");
                const email = createdTeacher.email;
                const password = "secret";
                const role = "teacher";
                const TeacherUser = {
                    username: username,
                    email: email,
                    password: password,
                    role: role
                };
                UserManagementService.createUser(TeacherUser).then((response) => {
                    const createdUser = response.data.user;
                    const userId = createdUser.id;
                    const teacherId = createdTeacher.id;
                    const linkData = {
                        userId,
                        teacherId
                    }
                    TeacherService.linkUser(linkData).then(() => {
                        setLoading(false);
                        navigate("/dashboard/teachers");
                        window.location.reload();
                    })
                });
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        }
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
                        title={id ? "Edit Teacher" : "Add Teacher"}
                    />
                    <CardContent>
                        {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                        <Grid container spacing={2}>
                            {inputField("name", currentTeacher.name, errors.name, "Name")}
                            {inputField("contact", currentTeacher.contact, errors.contact, "Contact Number")}
                            {inputField("email", currentTeacher.email, errors.email, "Email")}
                            {inputField("address", currentTeacher.address, errors.address, "Address")}
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='gender'
                                    defaultValue={currentTeacher.gender || ""}
                                    render={({ field }) => (
                                        <>
                                            <FormLabel id="radio-buttons-group-label">Gender</FormLabel>
                                            <RadioGroup
                                                {...field}
                                                aria-labelledby="radio-buttons-group-label"
                                                row
                                            >
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                                            </RadioGroup>
                                        </>
                                    )}
                                />

                                <Typography variant="body2" color="error">
                                    {errors.gender?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        control={control}
                                        name="join_date"
                                        defaultValue={currentTeacher.join_date || ""}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                label="Join Date"
                                                disableFuture
                                                onChange={(date) => field.onChange(format(date, "MM-dd-yyyy"))}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        label="Join Date"
                                                        variant="outlined"
                                                        margin='dense'
                                                        color='dark'
                                                        size='small'
                                                        error={errors.join_date ? true : false}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Typography variant="body2" color="error">
                                    {errors.join_date?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='department'
                                    defaultValue={currentTeacher.Department.name || ""}
                                    render={({ field }) => (
                                        <>
                                            <TextField
                                                {...field}
                                                select
                                                fullWidth
                                                label='Department'
                                                variant='outlined'
                                                margin='dense'
                                                color='dark'
                                                size='small'
                                                error={errors.department ? true : false}
                                            >
                                                {departments.map(department => (
                                                    <MenuItem key={department.id} value={department.name}>{department.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </>
                                    )}
                                />
                                <Typography variant="body2" color="error">
                                    {errors.department?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='description'
                                    defaultValue={currentTeacher.description || ""}
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

export default TeacherForm