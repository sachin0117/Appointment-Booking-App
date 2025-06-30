import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import PendingIcon from '@mui/icons-material/Pending';
import { BookAppointmentProps } from "../BookAppointment";

export default function AppointmentAnalytics({ appointments }: { appointments: BookAppointmentProps[] }) {
    return (
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
    )
}
