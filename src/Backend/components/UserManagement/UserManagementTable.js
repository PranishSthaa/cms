import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt, FaInfo } from 'react-icons/fa';
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog';
import UserManagementService from '../../../services/userManagement.service';

const UserManagementTable = () => {
    const [users, setUsers] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        UserManagementService.getAllUsers().then((response) => {
            setUsers(response.data);
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
        UserManagementService.deleteUser(id).then(response => {
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
                                    Username
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Role
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => {
                                return <TableRow
                                    hover
                                    key={user.id}
                                >
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {user.username}
                                    </TableCell>
                                    <TableCell>
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        {user.Role.name.toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit" >
                                            <IconButton sx={{ ml: 1 }}
                                                color='primary'
                                                size='small'
                                                component={Link}
                                                to={`edit/${user.id}`}>
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
                                            title="Delete User?"
                                            open={confirmOpen}
                                            setOpen={setConfirmOpen}
                                            onConfirm={() => { onDelete(user.id) }}
                                        >
                                            Are you sure you want to delete this user?
                                        </ConfirmDialog>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    component="div"
                    count={users.length}
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

export default UserManagementTable