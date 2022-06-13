import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardContent, TextField, Typography, CardHeader, Grid, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import TimeTableService from '../../../services/timetable.service';
import SubjectService from '../../../services/subject.service';

const TimetableForm = () => {
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        day: Yup.string().required("Day is required"),
        start_time: Yup.string().required("Start time is required"),
        end_time: Yup.string().required("End time is required"),
        subject: Yup.string().required("Subject is required"),
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
    const initialTimeTableState = {
        id: null,
        day: '',
        start_time: '',
        end_time: '',
        Subject: {},
    }
    const [currentTimeTable, setCurrentTimeTable] = useState(initialTimeTableState);
    const [subjects, setSubjects] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        SubjectService.getAllSubjects().then(response => {
            setSubjects(response.data);
        })
        if (id) {
            TimeTableService.getTimeTable(id).then(response => {
                const timeTable = response.data;
                const fields = ['day', 'start_time', 'end_time'];
                fields.forEach(field => setValue(field, timeTable[field]));
                setValue('subject', timeTable.Subject.name);
                setCurrentTimeTable(timeTable);
                setEditMode(true);
            })
        }
    }, [id, setValue]);

    const onError = (errors, e) => console.log(errors, e);
    const onSubmit = (data) => {
        const start_time = data.start_time;
        // const start = format(start_time, "hh:mm a");
        console.log(start_time, data);
        // setMessage("");
        // setLoading(true);
        // if (editMode) {
        //     TimeTableService.updateTimeTable(id, data).then(() => {
        //         setLoading(false);
        //         navigate("/dashboard/timetable");
        //     }, (error) => {
        //         const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        //         setLoading(false);
        //         setMessage(resMessage);
        //     });
        // } else {
        //     TimeTableService.createTimeTable(data).then(() => {
        //         setLoading(false);
        //         navigate("/dashboard/timetable");
        //         window.location.reload();
        //     }, (error) => {
        //         const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        //         setLoading(false);
        //         setMessage(resMessage);
        //     });
        // }
    }

    const days = [
        {
            title: "Sunday",
            value: "sunday"
        },
        {
            title: "Monday",
            value: "monday"
        },
        {
            title: "Tuesday",
            value: "tuesday"
        },
        {
            title: "Wednesday",
            value: "wednesday"
        },
        {
            title: "Thursday",
            value: "thursday"
        },
        {
            title: "Friday",
            value: "friday"
        },
        {
            title: "Saturday",
            value: "saturday"
        }
    ];

    return (
        <Box sx={{ mt: 3 }}>
            <Card>
                <Box sx={{ minWidth: 1050 }}>
                    <CardHeader
                        title={id ? "Edit Time Table" : "Add Time Table"}
                    />
                    <CardContent>
                        {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                        <Grid container spacing={2}>
                            <Grid item md={4} xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        control={control}
                                        name="start_time"
                                        defaultValue={currentTimeTable.start_time || ""}
                                        render={({ field }) => (
                                            <TimePicker
                                                {...field}
                                                inputFormat="HH:mm:ss"
                                                mask='__:__:__'
                                                label="Start Time"
                                                onChange={(time) => {
                                                    const formattedTime = format(time, "HH:mm:ss");
                                                    field.onChange(formattedTime);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        label="Start Time"
                                                        variant="outlined"
                                                        margin='dense'
                                                        color='dark'
                                                        size='small'
                                                        error={errors.start_time ? true : false}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Typography variant="body2" color="error">
                                    {errors.start_time?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        control={control}
                                        name="end_time"
                                        defaultValue={currentTimeTable.end_time || ""}
                                        render={({ field }) => (
                                            <TimePicker
                                                {...field}
                                                label="End Time"
                                                // onChange={(time) => field.onChange(time)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        label="End Time"
                                                        variant="outlined"
                                                        margin='dense'
                                                        color='dark'
                                                        size='small'
                                                        error={errors.end_time ? true : false}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Typography variant="body2" color="error">
                                    {errors.end_time?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='subject'
                                    defaultValue={currentTimeTable.Subject.name || ""}
                                    render={({ field }) => (
                                        <>
                                            <TextField
                                                {...field}
                                                select
                                                fullWidth
                                                label='Subject'
                                                variant='outlined'
                                                margin='dense'
                                                color='dark'
                                                size='small'
                                                error={errors.subject ? true : false}
                                            >
                                                {subjects.map(subject => (
                                                    <MenuItem key={subject.id} value={subject.name}>{subject.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </>
                                    )}
                                />
                                <Typography variant="body2" color="error">
                                    {errors.subject?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='day'
                                    defaultValue={currentTimeTable.day || ""}
                                    render={({ field }) => (
                                        <>
                                            <TextField
                                                {...field}
                                                select
                                                fullWidth
                                                label='Day'
                                                variant='outlined'
                                                margin='dense'
                                                color='dark'
                                                size='small'
                                                error={errors.day ? true : false}
                                            >
                                                {days.map(day => (
                                                    <MenuItem key={day.title} value={day.value}>{day.title}</MenuItem>
                                                ))}
                                            </TextField>
                                        </>
                                    )}
                                />
                                <Typography variant="body2" color="error">
                                    {errors.day?.message}
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

export default TimetableForm