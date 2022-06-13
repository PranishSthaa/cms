import React, { useEffect, useState } from 'react';
import { FaInfo } from 'react-icons/fa';
import { Box, Card, CardContent, Tooltip, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import SubjectService from '../../../services/subject.service';

const SubjectDetail = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        SubjectService.getSubject(id).then(response => {
            const subject = response.data;
            setSubject(subject);
            console.log(subject);
            setFaculty(subject.Faculty);
            setTeacher(subject.Teacher);
        });
    }, [id]);

    const listItems = [
        {
            title: "Name",
            value: subject.name
        },
        {
            title: "Description",
            value: subject.description
        },
        {
            title: "Subject Code",
            value: subject.code
        },
        {
            title: "Credit Hour",
            value: subject.credit_hour
        },
        {
            title: "Theory Full Marks",
            value: subject.full_marks_theory
        },
        {
            title: "Theory Pass Marks",
            value: subject.pass_marks_theory
        },
        {
            title: "Practical Full Marks",
            value: subject.full_marks_practical
        },
        {
            title: "Practical Pass Marks",
            value: subject.pass_marks_practical
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
                            <ListItem
                                divider
                            >
                                <ListItemText
                                    primary="Teacher"
                                    sx={{ maxWidth: 400 }}
                                >
                                </ListItemText>
                                <Box sx={{ textAlign: 'left', display: 'flex' }}>
                                    <Typography variant='body2'>{teacher.name}</Typography>
                                    <Tooltip title="Info" >
                                        <IconButton sx={{ ml: 1, pt: 0 }}
                                            color='info'
                                            size='small'
                                            component={Link}
                                            to={`/dashboard/teachers/${teacher.id}`}>
                                            <FaInfo />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </ListItem>
                        </List>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}

export default SubjectDetail