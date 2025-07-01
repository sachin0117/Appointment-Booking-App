import { Box, Card, CardContent, Grid, Typography, Divider, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, } from "@mui/material";
import { Event as EventIcon, AccessTime as AccessTimeIcon, Cancel as CancelIcon } from '@mui/icons-material'
import AdminDasboardHeader from "../../components/admindashboardhelper/AdminDasboardHeader";
import { formatTime, formatDate } from "../../helpers/Date&Time";
import { useEffect, useState } from "react";


export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
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

  return (
    <Box p={2}>
      <AdminDasboardHeader />
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
              </Typography >
              <Divider sx={{ mb: 3 }} />
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                <Table sx={{ minWidth: 1000 }} aria-label="appointments table">
                  <TableHead sx={{
                    backgroundColor: "rgba(0, 198, 255, 0.8)",
                  }}>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Time</strong></TableCell>
                      <TableCell><strong>Service Name</strong></TableCell>
                      <TableCell><strong>Notes</strong></TableCell>
                      <TableCell align="center"><strong>Status</strong></TableCell>
                      <TableCell align="center"><strong>Cancel</strong></TableCell>
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
                          <TableCell sx={{ fontWeight: 'medium' }}>
                            {appointment.fullname}
                          </TableCell><TableCell sx={{ fontWeight: 'medium' }}>
                            {appointment.email}
                          </TableCell>
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
                            {/* <StatusChip status={appointment.status || "pending"} /> */}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton>
                              <CancelIcon sx={{ color: "red" }} />
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>

  )
}


