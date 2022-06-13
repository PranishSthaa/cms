import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import StudentService from '../../../services/student.service';

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState([]);
    const [faculty, setFaculty] = useState([]);
    useEffect(() => {
        StudentService.getStudent(id).then(response => {
            const student = response.data;
            setStudent(student);
            console.log(student);
            setFaculty(student.Faculty);
        });
    }, [id]);
    const listItems = [
        {
            title: "Name",
            value: student.name
        },
        {
            title: "Contact Number",
            value: student.contact
        },
        {
            title: "Email",
            value: student.email
        },
        {
            title: "Address",
            value: student.address
        },
        {
            title: "Gender",
            value: student.gender
        },
        {
            title: "Date of Birth",
            value: student.date_of_birth
        },
        {
            title: "Roll Number",
            value: student.roll_no
        },
        {
            title: "Description",
            value: student.description
        },
    ];
    return (
        <Box sx={{ mt: 3 }}>
            <Card>
                <Box sx={{ minWidth: 1050 }}>
                    <CardContent>
                        <List disablePadding>
                            {listItems.map(listItem => (
                                <ListItem
                                    key={listItem.title}
                                    divider
                                >
                                    <ListItemText
                                        primary={listItem.title}
                                        sx={{ maxWidth: 400 }}
                                    >
                                    </ListItemText>
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Typography variant='body2'>{listItem.value}</Typography>
                                    </Box>
                                </ListItem>
                            ))}
                            <ListItem
                                divider
                            >
                                <ListItemText
                                    primary="Faculty"
                                    sx={{ maxWidth: 400 }}
                                >
                                </ListItemText>
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant='body2'>{faculty.name}</Typography>
                                </Box>
                            </ListItem>
                        </List>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}

export default StudentDetail