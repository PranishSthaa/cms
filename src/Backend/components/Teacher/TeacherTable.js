import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt, FaInfo } from 'react-icons/fa';
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog';
import TeacherService from '../../../services/teacher.service';
import AuthService from "../../../services/auth.service";

const TeacherTable = () => {
    const [teachers, setTeachers] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        TeacherService.getAllTeachers().then((response) => {
            setTeachers(response.data);
            console.log(response.data);
        });
    }, [])


    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onDelete = id => {
        TeacherService.deleteTeacher(id).then(response => {
            console.log(response.data.message);
            window.location.reload();
        }, (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(resMessage);
        })
    }
    return (
        <Box sx={{ mt: 3 }}>
            <Card>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow hover>
                                <TableCell>
                                    S.No
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Contact
                                </TableCell>
                                <TableCell>
                                    Department
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teachers.map((teacher, index) => {
                                return <TableRow
                                    hover
                                    key={teacher.id}
                                >
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {teacher.name}
                                    </TableCell>
                                    <TableCell>
                                        {teacher.email}
                                    </TableCell>
                                    <TableCell>
                                        {teacher.contact}
                                    </TableCell>
                                    <TableCell>
                                        {teacher.Department.name}
                                    </TableCell>
                                    <TableCell>
                                        {(currentUser.role.includes('ROLE_SUPERADMIN') || currentUser.role.includes('ROLE_ADMIN')) && <Box>
                                            <Tooltip title="Edit" >
                                                <IconButton sx={{ ml: 1 }}
                                                    color='primary'
                                                    size='small'
                                                    component={Link}
                                                    to={`edit/${teacher.id}`}>
                                                    <FaPencilAlt />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton sx={{ ml: 1 }}
                                                    color='error'
                                                    size='small'
                                                    onClick={() => setConfirmOpen(true)}>
                                                    <FaTrashAlt />
                                                </IconButton>
                                            </Tooltip>
                                            <ConfirmDialog
                                                title="Delete Teacher?"
                                                open={confirmOpen}
                                                setOpen={setConfirmOpen}
                                                onConfirm={() => { onDelete(teacher.id) }}
                                            >
                                                Are you sure you want to delete this teacher?
                                            </ConfirmDialog>
                                        </Box>}
                                        <Tooltip title="Info" >
                                            <IconButton sx={{ ml: 1 }}
                                                color='info'
                                                size='small'
                                                component={Link}
                                                to={`${teacher.id}`}>
                                                <FaInfo />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    component="div"
                    count={teachers.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Card>
        </Box>
    )
}

export default TeacherTable