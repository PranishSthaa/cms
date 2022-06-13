import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../ConfirmDialog';
import TimeTableService from '../../../services/timetable.service';

const TimetableTable = () => {
    const [timeTables, setTimeTables] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        TimeTableService.getAllTimeTables().then(response => {
            setTimeTables(response.data);
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
        TimeTableService.deleteTimeTable(id).then(response => {
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
                                    Day
                                </TableCell>
                                <TableCell>
                                    Subject
                                </TableCell>
                                <TableCell>
                                    Start Time
                                </TableCell>
                                <TableCell>
                                    End Time
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timeTables.map((timeTable, index) => {
                                return <TableRow
                                    hover
                                    key={timeTable.id}
                                >
                                    <TableCell>
                                        {index}
                                    </TableCell>
                                    <TableCell>
                                        {timeTable.day}
                                    </TableCell>
                                    <TableCell>
                                        {timeTable.Subject.name}
                                    </TableCell>
                                    <TableCell>
                                        {timeTable.start_time}
                                    </TableCell>
                                    <TableCell>
                                        {timeTable.end_time}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit" >
                                            <IconButton sx={{ ml: 1 }}
                                                color='primary'
                                                size='small'
                                                component={Link}
                                                to={`edit/${timeTable.id}`}>
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
                                            title="Delete Time Table?"
                                            open={confirmOpen}
                                            setOpen={setConfirmOpen}
                                            onConfirm={() => { onDelete(timeTable.id) }}
                                        >
                                            Are you sure you want to delete this time table?
                                        </ConfirmDialog>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    component="div"
                    count={timeTables.length}
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

export default TimetableTable