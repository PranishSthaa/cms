import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardContent, TextField, Typography, CardHeader, Grid, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SubjectService from '../../../services/subject.service';
import FacultyService from '../../../services/faculty.service';
import TeacherService from '../../../services/teacher.service';

const SubjectForm = () => {
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").matches(/^[a-z ,.'-]+$/i, { message: "Only alphabetical values are accepted.", excludeEmptyString: true }),
        code: Yup.string().required("Subject code is required"),
        credit_hour: Yup.string().required("Credit hour is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        full_marks_theory: Yup.string().required("Theory full marks is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        pass_marks_theory: Yup.string().required("Theory pass marks is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        full_marks_practical: Yup.string().required("Practical full marks is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        pass_marks_practical: Yup.string().required("Practical pass marks is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        description: Yup.string(),
        faculty: Yup.string().required("Faculty is required"),
        teacher: Yup.string().required("Teacher is required"),
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

    const initialSubjectState = {
        id: null,
        name: '',
        code: '',
        credit_hour: null,
        full_marks_theory: null,
        pass_marks_theory: null,
        full_marks_practical: null,
        pass_marks_practical: null,
        description: '',
        Faculty: {},
        Teacher: {}
    }
    const [currentSubject, setCurrentSubject] = useState(initialSubjectState);
    const [faculties, setFaculties] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        FacultyService.getAllFaculties().then(response => {
            setFaculties(response.data);
        });
        TeacherService.getAllTeachers().then(response => {
            setTeachers(response.data);
        })
        if (id) {
            SubjectService.getSubject(id).then(response => {
                const subject = response.data;
                const fields = ['name', 'code', 'credit_hour', 'full_marks_theory', 'pass_marks_theory', 'full_marks_practical', 'pass_marks_practical', 'description'];
                fields.forEach(field => setValue(field, subject[field]));
                setValue('faculty', subject.Faculty.name);
                setValue('teacher', subject.Teacher.name);
                setCurrentSubject(subject);
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
            SubjectService.updateSubject(id, data).then(() => {
                setLoading(false);
                navigate("/dashboard/subjects");
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            SubjectService.createSubject(data).then(() => {
                setLoading(false);
                navigate("/dashboard/subjects");
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
                        title={id ? "Edit Subject" : "Add Subject"}
                    />
                    <CardContent>
                        {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                        <Grid container spacing={2}>
                            {inputField("name", currentSubject.name, errors.name, "Name")}
                            {inputField("code", currentSubject.code, errors.code, "Subject Code")}
                            {inputField("credit_hour", currentSubject.credit_hour, errors.credit_hour, "Credit Hour")}
                            {inputField("full_marks_theory", currentSubject.full_marks_theory, errors.full_marks_theory, "Theory full marks")}
                            {inputField("pass_marks_theory", currentSubject.pass_marks_theory, errors.pass_marks_theory, "Theory pass marks")}
                            {inputField("full_marks_practical", currentSubject.full_marks_practical, errors.full_marks_practical, "Practical full marks")}
                            {inputField("pass_marks_practical", currentSubject.pass_marks_practical, errors.pass_marks_practical, "Practical pass marks")}
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='faculty'
                                    defaultValue={currentSubject.Faculty.name || ""}
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
                                <Typography variant="body2" color="error">
                                    {errors.faculty?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='teacher'
                                    defaultValue={currentSubject.Teacher.name || ""}
                                    render={({ field }) => (
                                        <>
                                            <TextField
                                                {...field}
                                                // SelectProps={{
                                                //     renderValue: (p) => p
                                                // }}
                                                select
                                                fullWidth
                                                label='Teacher'
                                                variant='outlined'
                                                margin='dense'
                                                color='dark'
                                                size='small'
                                                // renderValue={(p) => p}
                                                error={errors.teacher ? true : false}
                                            >
                                                {teachers.map(teacher => (
                                                    <MenuItem key={teacher.name} value={teacher.name}>{teacher.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </>
                                    )}
                                />
                                <Typography variant="body2" color="error">
                                    {errors.teacher?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='description'
                                    defaultValue={currentSubject.description || ""}
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

export default SubjectForm