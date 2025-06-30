import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Card, CardContent, Grid, Divider, Chip, IconButton } from "@mui/material";
import { Cancel as CancelIcon, Delete as DeleteIcon, Pending as PendingIcon, Check as CheckIcon, AccessTime as AccessTimeIcon, Event as EventIcon } from '@mui/icons-material';
import { formatDate, formatTime } from "../../helpers/Date&Time"
import AppointmentAnalytics from "../../components/userdashboardhelpers/AppointmentAnalytics";
import UserInfo from "../../components/userdashboardhelpers/UserInfo";
import UserDasboardHeader from "../../components/userdashboardhelpers/UserDasboardHeader";
import React, { useEffect } from "react";

export default function UserDashboard() {
    const [appointments, setAppointments] = React.useState<any[]>([]);

    useEffect(() => {
        const appointmentData = localStorage.getItem("AppointmentData");
        if (appointmentData) {
            try {
                const parsed = JSON.parse(appointmentData);
                setAppointments(Array.isArray(parsed) ? parsed : [parsed]);
            } catch (error) {
                console.error("Failed to parse AppointmentData", error);
            }
        }
    }, []);

    const StatusChip = ({ status }: { status: string }) => {
        switch (status) {
            case "confirmed":
                return (
                    <Chip
                        icon={<CheckIcon />}
                        label="Confirmed"
                        color="success"
                        size="small"
                        variant="outlined"
                    />
                );
            case "pending":
                return (
                    <Chip
                        icon={<PendingIcon />}
                        label="Pending"
                        color="warning"
                        size="small"
                        variant="outlined"
                    />
                );
            case "cancelled":
                return (
                    <Chip
                        icon={<CancelIcon />}
                        label="Cancelled"
                        color="error"
                        size="small"
                        variant="outlined"
                    />
                );
            default:
                return <Chip label={status} size="small" variant="outlined" />;
        }
    };

    const handleDelete = (id: string) => {
        const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
        setAppointments(updatedAppointments);
        localStorage.setItem("AppointmentData", JSON.stringify(updatedAppointments));
    }

    return (
        <Box p={2}>
            <UserDasboardHeader appointments={appointments} />
            <Grid container spacing={3}>
                <Grid>
                    <Card elevation={1} sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                mb: 2
                            }}>
                                <EventIcon sx={{ mr: 1, color: "black" }} />
                                Upcoming Appointments
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                                <Table sx={{ minWidth: 1000 }} aria-label="appointments table">
                                    <TableHead sx={{
                                        backgroundColor: "rgba(0, 198, 255, 0.8)",
                                    }}>
                                        <TableRow>
                                            <TableCell><strong>Date</strong></TableCell>
                                            <TableCell><strong>Time</strong></TableCell>
                                            <TableCell><strong>Service</strong></TableCell>
                                            <TableCell><strong>Notes</strong></TableCell>
                                            <TableCell align="center"><strong>Status</strong></TableCell>
                                            <TableCell align="center"><strong>Delete</strong></TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {appointments.length > 0 ? (
                                            appointments.map((appointment, idx) => (
                                                <TableRow
                                                    key={appointment.id || idx}
                                                    hover
                                                    sx={{
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <EventIcon sx={{
                                                                mr: 1,
                                                                color: "black",
                                                                fontSize: 20
                                                            }} />
                                                            {formatDate(appointment.appointmentDate)}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <AccessTimeIcon sx={{
                                                                mr: 1,
                                                                color: "black",
                                                                fontSize: 20
                                                            }} />
                                                            {formatTime(appointment.timeSlotFrom)} - {formatTime(appointment.timeSlotTo)}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{ fontWeight: 'medium' }}>
                                                        {appointment.serviceType}
                                                    </TableCell>
                                                    <TableCell sx={{ color: "gray" }}>
                                                        {appointment.notes}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <StatusChip status={appointment.status || "pending"} />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton>
                                                            <DeleteIcon sx={{ color: "red" }} onClick={() => handleDelete(appointment.id)} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',

                                                    }}>
                                                        <EventIcon sx={{ fontSize: 60, mb: 1 }} />
                                                        <Typography variant="h6">
                                                            No upcoming appointments
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                                            Schedule an appointment to get started
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box
                                mt={3}
                                p={2}
                                sx={{
                                    border: "1px dashed #ccc",
                                    borderRadius: 2,
                                    backgroundColor: "#f9f9f9",
                                    textAlign: "center",
                                }}
                            >
                                <Typography variant="body2" color="textSecondary">
                                    ⏳ All appointments are initially marked as{" "}
                                    <strong>Pending</strong>. Your service provider will review
                                    and confirm them shortly.
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <UserInfo />
                <AppointmentAnalytics appointments={appointments} />
            </Grid>
        </Box>
    );
}
