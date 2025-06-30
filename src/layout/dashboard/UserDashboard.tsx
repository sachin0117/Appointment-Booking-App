import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Card, CardContent, Grid, Avatar, Divider } from "@mui/material";
import { format, parseISO } from "date-fns";
import { getInitials } from "../../helpers/GetInitials";
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import CheckIcon from '@mui/icons-material/Check';
import PendingIcon from '@mui/icons-material/Pending';
// import CancelledIcon from '@mui/icons-material/Cancel';
import { PersonPinCircleOutlined } from "@mui/icons-material";

export default function UserDashboard() {
    const userData = localStorage.getItem("userData");
    const fullName = userData ? JSON.parse(userData)?.fullname : "User";
    const email = userData ? JSON.parse(userData)?.email : "User";

    const appointmentData = localStorage.getItem("AppointmentData");
    let appointments: any[] = [];

    if (appointmentData) {
        try {
            const parsed = JSON.parse(appointmentData);
            appointments = Array.isArray(parsed) ? parsed : [parsed];
        } catch (error) {
            console.error("Failed to parse AppointmentData", error);
        }
    }
    const formatDate = (dateString: string) => {
        try {
            const date = parseISO(dateString);
            return format(date, "MM dd, yyyy");
        } catch (error) {
            return "Invalid date";
        }
    };

    const formatTime = (timeString: string) => {
        try {
            const [hours, minutes] = timeString.split(":");
            const hourNum = parseInt(hours, 10);
            const period = hourNum >= 12 ? "PM" : "AM";
            const hour12 = hourNum % 12 || 12;
            return `${hour12}:${minutes} ${period}`;
        } catch (error) {
            return timeString;
        }
    };

    // const StatusChip = ({ status }: { status: string }) => {
    //     switch (status) {
    //         case "confirmed":
    //             return (
    //                 <Chip
    //                     icon={<CheckIcon />}
    //                     label="Confirmed"
    //                     color="success"
    //                     size="small"
    //                     variant="outlined"
    //                 />
    //             );
    //         case "pending":
    //             return (
    //                 <Chip
    //                     icon={<PendingIcon />}
    //                     label="Pending"
    //                     color="warning"
    //                     size="small"
    //                     variant="outlined"
    //                 />
    //             );
    //         case "cancelled":
    //             return (
    //                 <Chip
    //                     icon={<CancelledIcon />}
    //                     label="Cancelled"
    //                     color="error"
    //                     size="small"
    //                     variant="outlined"
    //                 />
    //             );
    //         default:
    //             return <Chip label={status} size="small" variant="outlined" />;
    //     }
    // };

    return (
        <Box p={2}>
            <Card elevation={2} sx={{
                mb: 4,
                background: "linear-gradient(135deg, rgba(12, 122, 241, 0.8) 0%, rgba(0, 198, 255, 0.8) 100%)",
                color: 'white',
                borderRadius: 2
            }}>
                <CardContent>
                    <Grid container alignItems="center" spacing={3}>
                        <Grid >
                            <Avatar sx={{
                                width: 80,
                                height: 80,
                                bgcolor: 'rgba(255,255,255,0.2)',
                                fontSize: '2.5rem'
                            }}>
                                {getInitials(fullName)}
                            </Avatar>
                        </Grid>
                        <Grid  >
                            <Typography variant="h4" component="h1" gutterBottom>
                                Welcome back, {fullName}!
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                Here's your upcoming appointments and schedule
                            </Typography>
                        </Grid>
                        <Grid >
                            <Box sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                p: 2,
                                borderRadius: 2,
                                textAlign: 'center'
                            }}>
                                <Typography variant="h5" gutterBottom>
                                    {appointments.filter(a => a.status === 'Confirmed').length}
                                </Typography>
                                <Typography variant="body2">
                                    Upcoming Appointments
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

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
                                                    {/* <TableCell align="center">
                                                        <StatusChip status={appointment.status} />
                                                    </TableCell> */}
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid>
                <Card elevation={1} sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold'
                        }}>
                            <PersonPinCircleOutlined sx={{ mr: .5, color: "black" }} />
                            Your Information
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ p: 1 }}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Full Name:</strong> {fullName}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Email:</strong> {email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Member Since:</strong> January 2024
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid >
                <Card elevation={1} sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 'bold'
                        }}>
                            <PendingIcon sx={{ mr: 1, color: "black" }} />
                            Appointment Statistics
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Grid container spacing={2}>
                            <Grid >
                                <Box sx={{
                                    p: 2,
                                    bgcolor: "rgba(0, 198, 255, 0.8)",
                                    borderRadius: 2,
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {appointments.filter(a => a.status === 'Confirmed').length}
                                    </Typography>
                                    <Typography variant="body2">Confirmed</Typography>
                                </Box>
                            </Grid>

                            <Grid >
                                <Box sx={{
                                    p: 2,
                                    bgcolor: "rgba(0, 198, 255, 0.8)",
                                    borderRadius: 2,
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {appointments.filter(a => a.status === 'Pending').length}
                                    </Typography>
                                    <Typography variant="body2">Pending</Typography>
                                </Box>
                            </Grid>

                            <Grid >
                                <Box sx={{
                                    p: 2,
                                    bgcolor: "rgba(0, 198, 255, 0.8)",
                                    borderRadius: 2,
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {appointments.filter(a => a.status === 'Cancelled').length}
                                    </Typography>
                                    <Typography variant="body2">Cancelled</Typography>
                                </Box>
                            </Grid>

                            <Grid >
                                <Box sx={{
                                    p: 2,
                                    bgcolor: "rgba(0, 198, 255, 0.8)",
                                    borderRadius: 2,
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {appointments.length}
                                    </Typography>
                                    <Typography variant="body2">Total</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

        </Box>
    );
}
