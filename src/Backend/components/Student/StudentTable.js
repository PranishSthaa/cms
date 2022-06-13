import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt, FaInfo } from 'react-icons/fa';
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog';
import StudentService from '../../../services/student.service';
import AuthService from "../../../services/auth.service";

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        StudentService.getAllStudents().then((response) => {
            setStudents(response.data);
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
        StudentService.deleteStudent(id).then(response => {
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
                                    Faculty
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student, index) => {
                                return <TableRow
                                    hover
                                    key={student.id}
                                >
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {student.name}
                                    </TableCell>
                                    <TableCell>
                                        {student.email}
                                    </TableCell>
                                    <TableCell>
                                        {student.contact}
                                    </TableCell>
                                    <TableCell>
                                        {student.Faculty.name}
                                    </TableCell>
                                    <TableCell>
                                        {(currentUser.role.includes('ROLE_SUPERADMIN') || currentUser.role.includes('ROLE_ADMIN')) && <Box>
                                            <Tooltip title="Edit" >
                                                <IconButton sx={{ ml: 1 }}
                                                    color='primary'
                                                    size='small'
                                                    component={Link}
                                                    to={`edit/${student.id}`}>
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
                                                title="Delete Student?"
                                                open={confirmOpen}
                                                setOpen={setConfirmOpen}
                                                onConfirm={() => { onDelete(student.id) }}
                                            >
                                                Are you sure you want to delete this student?
                                            </ConfirmDialog>
                                        </Box>}
                                        <Tooltip title="Info" >
                                            <IconButton sx={{ ml: 1 }}
                                                color='info'
                                                size='small'
                                                component={Link}
                                                to={`${student.id}`}>
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
                    count={students.length}
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

export default StudentTable