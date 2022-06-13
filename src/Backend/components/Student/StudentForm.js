import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardContent, TextField, Typography, CardHeader, Grid, RadioGroup, FormLabel, FormControlLabel, Radio, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import StudentService from '../../../services/student.service';
import FacultyService from '../../../services/faculty.service';
import { format } from 'date-fns';

const StudentForm = () => {
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").matches(/^[a-z ,.'-]+$/i, { message: "Only alphabetical values are accepted.", excludeEmptyString: true }),
        contact: Yup.string().required("Contact number is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        address: Yup.string().required("Address is required"),
        gender: Yup.string().required("Gender is required"),
        date_of_birth: Yup.string().required("Date of birth is required"),
        roll_no: Yup.string().required("Role number is required"),
        // image: Yup.string(),
        description: Yup.string(),
        faculty: Yup.string().required("Faculty is required"),
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
    const initialStudentState = {
        id: null,
        name: "",
        contact: "",
        email: "",
        address: "",
        gender: "",
        date_of_birth: "",
        roll_no: "",
        image: "",
        description: "",
        Faculty: {},
    }
    const [currentStudent, setCurrentStudent] = useState(initialStudentState);
    const [faculties, setFaculties] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        FacultyService.getAllFaculties().then(response => {
            setFaculties(response.data);
        })
        if (id) {
            StudentService.getStudent(id).then(response => {
                const student = response.data;
                const fields = ['name', 'contact', 'email', 'address', 'gender', 'date_of_birth', 'roll_no', 'image', 'description'];
                fields.forEach(field => setValue(field, student[field]));
                setValue('faculty', student.Faculty.name);
                setCurrentStudent(student);
                setEditMode(true);
            })
        }
    }, [id, setValue]);

    const onError = (errors, e) => console.log(errors, e);
    const onSubmit = (data) => {
        // console.log(data);
        setMessage("");
        setLoading(true);
        if (editMode) {
            StudentService.updateStudent(id, data).then(() => {
                setLoading(false);
                navigate("/dashboard/students");
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            StudentService.createStudent(data).then(() => {
                setLoading(false);
                navigate("/dashboard/students");
                window.location.reload();
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
                        title={id ? "Edit Student" : "Add Student"}
                    />
                    <CardContent>
                        {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                        <Grid container spacing={2}>
                            {inputField("name", currentStudent.name, errors.name, "Name")}
                            {inputField("contact", currentStudent.contact, errors.contact, "Contact Number")}
                            {inputField("email", currentStudent.email, errors.email, "Email")}
                            {inputField("address", currentStudent.address, errors.address, "Address")}
                            {inputField("roll_no", currentStudent.roll_no, errors.roll_no, "Roll Number")}
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='gender'
                                    defaultValue={currentStudent.gender || ""}
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
                                        name="date_of_birth"
                                        defaultValue={currentStudent.date_of_birth || ""}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                disableFuture
                                                label="Date of birth"
                                                onChange={(date) => field.onChange(format(date, "MM-dd-yyyy"))}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        label="Date of birth"
                                                        variant="outlined"
                                                        margin='dense'
                                                        color='dark'
                                                        size='small'
                                                        error={errors.date_of_birth ? true : false}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Typography variant="body2" color="error">
                                    {errors.date_of_birth?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='faculty'
                                    defaultValue={currentStudent.Faculty.name || ""}
                                    render={({ field }) => (
                                        <>
                                            <TextField
                                                {...field}
                                                select
                                                fullWidth
                                                label='Faculty'
                                                variant='outlined'
                                                margin='dense'
                                                color='dark'
                                                size='small'
                                                error={errors.faculty ? true : false}
                                            >
                                                {faculties.map(faculty => (
                                                    <MenuItem key={faculty.id} value={faculty.name}>{faculty.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </>
                                    )}
                                />
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='description'
                                    defaultValue={currentStudent.description || ""}
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
                            onClick={handleSubmit(onSubmit, onError)}>
                            {(loading) ? "Loading..." : "Submit"}
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}

export default StudentForm