import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { getInitials } from "../../helpers/GetInitials";
import { BookAppointmentProps } from "./BookAppointment";


export default function UserDasboardHeader() {
    const userData = localStorage.getItem("currentUser");
    const currentUser = userData ? JSON.parse(userData) : null;
    const fullName = userData ? JSON.parse(userData)?.fullname : "User";
    const appointments = JSON.parse(localStorage.getItem("AppointmentData") || "[]");
    const userAppointments = currentUser
        ? appointments.filter((a: any) => a.email === currentUser.email)
        : [];
    const confirmedCount = userAppointments.filter((a: BookAppointmentProps) => (a.status || "").toLowerCase() === "confirmed").length;
    return (
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
                            bgcolor: 'white',
                            color: "black",
                            fontSize: '2.5rem'
                        }}>
                            {getInitials(fullName)}
                        </Avatar>
                    </Grid>
                    <Grid  >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Welcome {fullName}!
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
                                {confirmedCount}
                            </Typography>
                            <Typography variant="body2">
                                Upcoming Appointments
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
