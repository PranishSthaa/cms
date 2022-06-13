import React, { useEffect, useState } from 'react';
import { Button, Box, Card, CardContent, Typography, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthService from "../../../services/auth.service";
import SubjectService from "../../../services/subject.service";
import TeacherService from '../../../services/teacher.service';

const SubjectList = () => {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser.id;
    const isTeacher = currentUser.role.includes("ROLE_TEACHER");
    const [subjects, setSubjects] = useState([]);
    const [teacher, setTeacher] = useState([]);

    useEffect(() => {
        if (isTeacher) {
            TeacherService.getTeacherByUserId({ userId }).then((response) => {
                setTeacher(response.data);

            });
        }
        if (teacher.id) {
            SubjectService.getAllSubjectsByTeacher({ teacherId: teacher.id }).then(response => {
                setSubjects(response.data);
            })
        } else {
            SubjectService.getAllSubjects().then(response => {
                setSubjects(response.data);
            })
        }
    }, [isTeacher, teacher.id, userId]);
    return (
        <>
            <Box sx={{ mt: 3 }}>
                <Card >
                    <Box sx={{ minWidth: 1050 }}>
                        <CardHeader
                            title={isTeacher ? "Your Subjects" : "All Subjects"}
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                {subjects.map(subject => (
                                    <Grid item md={4} xs={6} key={subject.id}>
                                        <Card variant='outlined'>
                                            <CardContent>
                                                <Grid container spacing={0}>
                                                    <Grid item md={12} xs={12}>
                                                        <Typography variant='h5'>{subject.name}</Typography>
                                                    </Grid>
                                                    <Grid item md={6} xs={6}>
                                                        <Typography variant='overline'>Code: {subject.code}</Typography>
                                                    </Grid>
                                                    <Grid item md={6} xs={6}>
                                                        <Typography variant='overline'>Faculty: {subject.Faculty.name}</Typography>
                                                    </Grid>
                                                    <Grid item md={6} xs={6} >
                                                        {isTeacher
                                                            && <Button
                                                                component={Link}
                                                                to={`takeattendance/${subject.id}`}
                                                                variant='outlined'
                                                                color={'primary'}
                                                                sx={{ my: 1.5 }}>
                                                                Take Attendance
                                                            </Button>}
                                                    </Grid>
                                                    <Grid item md={6} xs={6} >
                                                        <Button
                                                            component={Link}
                                                            to={`viewattendance/${subject.id}`}
                                                            variant='outlined'
                                                            color={'success'}
                                                            sx={{ my: 1.5 }}
                                                            onClick={() => { }}>
                                                            View Attendance
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Box>
                </Card>
            </Box>
            {/* {currentUser.role.includes("ROLE_TEACHER")
                ? <div>Teacher {userId}</div>
                : <div>Others</div>} */}
        </>
    )
}

export default SubjectList