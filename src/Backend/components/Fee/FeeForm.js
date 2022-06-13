import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardContent, TextField, Typography, CardHeader, Grid, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import FeeService from '../../../services/fee.service';
import StudentService from '../../../services/student.service';

const FeeForm = () => {
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        receipt_no: Yup.string().required("Receipt Number is required"),
        amount: Yup.string().required("Amount is required").matches(/^[0-9]*$/, { message: "Only numerical values are accepted.", excludeEmptyString: true }),
        type: Yup.string().required("Fee type is required"),
        date: Yup.string().required("Date is required"),
        status: Yup.boolean().required("Status is required"),
        student: Yup.string().required("Student is required"),
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
    const initialFeeState = {
        id: null,
        receipt_no: '',
        type: '',
        date: '',
        status: null,
        Student: {},
    }
    const [currentFee, setCurrentFee] = useState(initialFeeState);
    const [students, setStudents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        StudentService.getAllStudents().then(response => {
            setStudents(response.data);
        })
        if (id) {
            FeeService.getFee(id).then(response => {
                const fee = response.data;
                const fields = ['receipt_no', 'amount', 'type', 'date', 'status'];
                fields.forEach(field => setValue(field, fee[field]));
                setValue('student', fee.Student.name);
                setCurrentFee(fee);
                setEditMode(true);
            })
        }
    }, [id, setValue]);

    const onError = (errors, e) => console.log(errors, e);
    const onSubmit = (data) => {
        // console.log(data);
        const sendData = {
            ...data,
            status: true,
        }
        setMessage("");
        setLoading(true);
        if (editMode) {
            FeeService.updateFee(id, data).then(() => {
                setLoading(false);
                navigate("/dashboard/fee");
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            FeeService.createFee(data).then(() => {
                setLoading(false);
                navigate("/dashboard/fee");
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
                        title={id ? "Edit Fee Entry" : "Add Fee Entry"}
                    />
                    <CardContent>
                        {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
                        <Grid container spacing={2}>
                            {inputField("receipt_no", currentFee.receipt_no, errors.receipt_no, "Receipt Number")}
                            {inputField("amount", currentFee.amount, errors.amount, "Amount")}
                            <Grid item md={4} xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        control={control}
                                        name="date"
                                        defaultValue={currentFee.date || ""}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                disableFuture
                                                label="Date"
                                                onChange={(date) => field.onChange(format(date, "MM-dd-yyyy"))}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        label="Date"
                                                        variant="outlined"
                                                        margin='dense'
                                                        color='dark'
                                                        size='small'
                                                        error={errors.date ? true : false}
                                                    />
                                                )}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <Typography variant="body2" color="error">
                                    {errors.date?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='student'
                                    defaultValue={currentFee.Student.name || ""}
                                    render={({ field }) => (
                                        <>
                                            <TextField
                                                {...field}
                                                select
                                                fullWidth
                                                label='Student'
                                                variant='outlined'
                                                margin='dense'
                                                color='dark'
                                                size='small'
                                                error={errors.student ? true : false}
                                            >
                                                {students.map(student => (
                                                    <MenuItem key={student.id} value={student.name}>{student.name}</MenuItem>
                                                ))}
                                            </TextField>
                                        </>
                                    )}
                                />
                                <Typography variant="body2" color="error">
                                    {errors.student?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <Controller
                                    control={control}
                                    name='type'
                                    defaultValue={currentFee.type || ""}
                                    render={({ field }) => (
                                        <>
                                            <TextField
                                                {...field}
                                                select
                                                fullWidth
                                                label='Fee Type'
                                                variant='outlined'
                                                margin='dense'
                                                color='dark'
                                                size='small'
                                                error={errors.type ? true : false}
                                            >
                                                <MenuItem value="admission">Admission</MenuItem>
                                                <MenuItem value="semester">Semester</MenuItem>
                                                <MenuItem value="exam">Exam</MenuItem>
                                                <MenuItem value="other">Other</MenuItem>
                                            </TextField>
                                        </>
                                    )}
                                />
                                <Typography variant="body2" color="error">
                                    {errors.student?.message}
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

export default FeeForm