import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog';
import FeeService from '../../../services/fee.service';
import AuthService from "../../../services/auth.service";

const FeeTable = () => {
    const [fees, setFees] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        FeeService.getAllFees().then(response => {
            setFees(response.data);
            console.log(response.data);
        })
    }, []);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onDelete = id => {
        FeeService.deleteFee(id).then(response => {
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
                                    Receipt No.
                                </TableCell>
                                <TableCell>
                                    Type
                                </TableCell>
                                <TableCell>
                                    Amount
                                </TableCell>
                                <TableCell>
                                    Date
                                </TableCell>
                                <TableCell>
                                    Student
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fees.map((fee) => {
                                return <TableRow
                                    hover
                                    key={fee.id}
                                >
                                    <TableCell>
                                        {fee.receipt_no}
                                    </TableCell>
                                    <TableCell>
                                        {fee.type}
                                    </TableCell>
                                    <TableCell>
                                        {fee.amount}
                                    </TableCell>
                                    <TableCell>
                                        {fee.date.split('T')[0]}
                                    </TableCell>
                                    <TableCell>
                                        {fee.Student.name}
                                    </TableCell>
                                    <TableCell>
                                        {(fee.status) ? "PAID" : "PENDING"}
                                    </TableCell>
                                    <TableCell>
                                        {currentUser.role.includes('ROLE_ACCOUNTANT') && <Box>
                                            <Tooltip title="Edit" >
                                                <IconButton sx={{ ml: 1 }}
                                                    color='primary'
                                                    size='small'
                                                    component={Link}
                                                    to={`edit/${fee.id}`}>
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
                                                title="Delete Fee?"
                                                open={confirmOpen}
                                                setOpen={setConfirmOpen}
                                                onConfirm={() => { onDelete(fee.id) }}
                                            >
                                                Are you sure you want to delete this fee entry?
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
                    count={fees.length}
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

export default FeeTable