import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import TeacherService from '../../../services/teacher.service';

const TeacherDetail = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState([]);
    const [department, setDepartment] = useState([]);
    useEffect(() => {
        TeacherService.getTeacher(id).then(response => {
            const teacher = response.data;
            setTeacher(teacher);
            console.log(teacher);
            setDepartment(teacher.Department);
        });
    }, [id]);

    const listItems = [
        {
            title: "Name",
            value: teacher.name
        },
        {
            title: "Contact Number",
            value: teacher.contact
        },
        {
            title: "Email",
            value: teacher.email
        },
        {
            title: "Address",
            value: teacher.address
        },
        {
            title: "Gender",
            value: teacher.gender
        },
        {
            title: "Join Date",
            value: teacher.join_date
        },
        {
            title: "Description",
            value: teacher.description
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
                                    primary="Department"
                                    sx={{ maxWidth: 400 }}
                                >
                                </ListItemText>
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant='body2'>{department.name}</Typography>
                                </Box>
                            </ListItem>
                        </List>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}

export default TeacherDetail