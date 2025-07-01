import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { PersonPinCircleOutlined } from "@mui/icons-material";

export default function UserInfo() {
    const userData = localStorage.getItem("currentUser");
    const fullName = userData ? JSON.parse(userData)?.fullname : "User";
    const email = userData ? JSON.parse(userData)?.email : "User";
    return (
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
                            <strong>Member Since:</strong> January 2025
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}
