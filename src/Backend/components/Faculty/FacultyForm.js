import React, { useState, useEffect } from 'react'
import { Button, Box, Card, CardContent, TextField, Typography, CardHeader, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FacultyService from '../../../services/faculty.service';


const FacultyForm = () => {
  const { id } = useParams();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    faculty_code: Yup.string().required("Faculty code is required"),
    description: Yup.string()
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });

  const initialFacultyState = {
    id: null,
    name: "",
    faculty_code: "",
    description: ""
  }
  const [currentFaculty, setCurrentFaculty] = useState(initialFacultyState);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      FacultyService.getFaculty(id).then(response => {
        const faculty = response.data;
        const fields = ['name', 'faculty_code', 'description'];
        fields.forEach(field => setValue(field, faculty[field]));
        setCurrentFaculty(faculty);
        setEditMode(true);
      })
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);
    if (editMode) {
      FacultyService.updateFaculty(id, data).then(() => {
        setLoading(false);
        navigate("/dashboard/faculties");
      }, (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setLoading(false);
        setMessage(resMessage);
      });
    } else {
      FacultyService.createFaculty(data).then(() => {
        setLoading(false);
        navigate("/dashboard/faculties");
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
            title={id ? "Edit Faculty" : "Add Faculty"}
          />
          <CardContent>
            {message && (<Typography variant='body2' color='error' >{message}</Typography>)}
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='name'
                  defaultValue={currentFaculty.name || ""}
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
                  name='faculty_code'
                  defaultValue={currentFaculty.faculty_code || ""}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="Faculty Code"
                      variant="outlined"
                      margin='dense'
                      color='dark'
                      size='small'
                      error={errors.faculty_code ? true : false}
                    />
                  )}
                />
                <Typography variant="body2" color="error">
                  {errors.faculty_code?.message}
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name='description'
                  defaultValue={currentFaculty.description || ""}
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

export default FacultyForm