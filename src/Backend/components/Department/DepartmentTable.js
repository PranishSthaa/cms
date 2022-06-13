import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import DepartmentService from '../../../services/department.service';
import ConfirmDialog from '../ConfirmDialog';
import AuthService from "../../../services/auth.service";

const DepartmentTable = () => {
    const [departments, setDepartments] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const currentUser = AuthService.getCurrentUser();

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const onDelete = id => {
        DepartmentService.deleteDepartment(id).then(response => {
            console.log(response.data.message);
            window.location.reload();
        }, (error) => {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(resMessage);
        })
    }

    useEffect(() => {
        DepartmentService.getAllDepartments().then((response) => {
            setDepartments(response.data);
            console.log(response.data);
        });
    }, [])

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
                                    Description
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((department, index) => {
                                return <TableRow
                                    hover
                                    key={department.id}
                                >
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {department.name}
                                    </TableCell>
                                    <TableCell>
                                        {department.description}
                                    </TableCell>
                                    <TableCell>
                                        {(currentUser.role.includes('ROLE_SUPERADMIN') || currentUser.role.includes('ROLE_ADMIN')) && <Box>
                                            <Tooltip title="Edit" >
                                                <IconButton sx={{ ml: 1 }}
                                                    color='info'
                                                    size='small'
                                                    component={Link}
                                                    to={`edit/${department.id}`}>
                                                    <FaPencilAlt />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    sx={{ ml: 1 }}
                                                    color='error'
                                                    size='small'
                                                    onClick={() => setConfirmOpen(true)}>
                                                    <FaTrashAlt />
                                                </IconButton>
                                            </Tooltip>
                                            <ConfirmDialog
                                                title="Delete Department?"
                                                open={confirmOpen}
                                                setOpen={setConfirmOpen}
                                                onConfirm={() => { onDelete(department.id) }}
                                            >
                                                Are you sure you want to delete this department?
                                            </ConfirmDialog>
                                        </Box>}

                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    component="div"
                    count={departments.length}
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

export default DepartmentTable