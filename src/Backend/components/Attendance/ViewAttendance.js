import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Box, Card, CardContent, TextField, CardHeader, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import AttendanceService from '../../../services/attendance.service';

const ViewAttendance = () => {
    const { id } = useParams();
    const [attendances, setAttendances] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [date, setDate] = useState(format(new Date(), "MM-dd-yyyy"));

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const getAttendances = (date, subjectId) => {
        const data = { date, subjectId };
        AttendanceService.getAttendanceByDateAndSubject(data).then((response) => {
            setAttendances(response.data);
        })
    }

    useEffect(() => {

    }, [])

    return (
        <Box sx={{ mt: 3 }}>
            <Card>
                <Box sx={{ minWidth: 1050 }}>
                    <CardHeader
                        title={"View Attendance"}
                    />
                    <CardContent>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableFuture
                                label="Date of birth"
                                value={date}
                                onChange={(date) => setDate(format(date, "MM-dd-yyyy"))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Date of birth"
                                        variant="outlined"
                                        margin='dense'
                                        color='dark'
                                        size='small'
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <Button
                            variant='outlined'
                            color={'success'}
                            sx={{ mt: 1, ml: 1 }}
                            onClick={() => { getAttendances(date, id) }}>
                            View
                        </Button>
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
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                </TableBody>
                            </Table>
                        </Box>
                        <TablePagination
                            component="div"
                            count={attendances.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={limit}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    </CardContent>
                </Box>
            </Card>
        </Box>
    )
}

export default ViewAttendance