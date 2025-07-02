import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, FormControl, FormLabel, Grid, MenuItem, Paper, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export type BookAppointmentProps = {
    id: string;
    serviceType: string;
    appointmentDate: string;
    timeSlotFrom: string;
    timeSlotTo: string;
    notes: string;
    status: string;
};

type BookAppointmentFormFields = Omit<BookAppointmentProps, "id">; // copy from exiting type without key property "id   "

const today = new Date();
today.setHours(0, 0, 0, 0);
const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
].join('-');

const schema = Yup.object({
    serviceType: Yup.string().required("Service Type is required"),
    appointmentDate: Yup.string()
        .required("Appointment Date is required")
        .test("not-in-past", "Appointment Date cannot be in the past", (value) => {
            if (!value) return false;
            return value >= todayStr;
        }),
    timeSlotFrom: Yup.string()
        .required("Time Slot From is required")
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    timeSlotTo: Yup.string()
        .required("Time Slot To is required")
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    notes: Yup.string()
        .max(500, "Notes cannot exceed 500 characters")
        .optional()
        .default(""),
    status: Yup.string().default("Pending")
}).required();

const defaultValues: BookAppointmentFormFields = {
    serviceType: "",
    appointmentDate: todayStr,
    timeSlotFrom: "",
    timeSlotTo: "",
    notes: "",
    status: "Pending",
};

const Service = (() => {
    const raw = localStorage.getItem("services");
    try {
        const arr = JSON.parse(raw || "[]");
        return Array.isArray(arr) ? arr : [];
    } catch {
        return [];
    }
})();

export default function BookAppointment() {
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        reset,
    } = useForm<BookAppointmentFormFields>({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: BookAppointmentFormFields) => {
        const CurrentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
        const appointmentWithId: BookAppointmentProps & { fullname?: string; email?: string } = {
            ...data, id: uuidv4(), fullname: CurrentUser.fullname,
            email: CurrentUser.email,
        };
        const existing = localStorage.getItem('AppointmentData');
        let appointments: BookAppointmentProps[] = [];
        if (existing) {
            const parsed = JSON.parse(existing);
            appointments = Array.isArray(parsed) ? parsed : [parsed];
        }
        appointments.push(appointmentWithId);
        localStorage.setItem('AppointmentData', JSON.stringify(appointments));
        setSnackbar({ open: true, message: "Appoinment booked successfully!", severity: "success" });
        reset(defaultValues);
        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);

    };

    return (
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    minHeight: "90vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f0f2f5",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        maxWidth: 600,
                        width: "100%",
                        borderRadius: 2
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            mb: 3,
                            fontWeight: 600,
                            color: "#2d3748"
                        }}
                    >
                        Book Appointment
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack spacing={2}>
                            <FormControl fullWidth error={!!errors.serviceType}>
                                <FormLabel sx={{ mb: 1, fontWeight: 500 }}>Service Type</FormLabel>
                                <Controller
                                    name="serviceType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field}>
                                            <MenuItem value="" disabled>
                                                Select Service Type
                                            </MenuItem>
                                            {Service.map((option: any) => (
                                                <MenuItem key={option.id} value={option.addService}>
                                                    {option.addService}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.serviceType && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                        {errors.serviceType.message}
                                    </Typography>
                                )}
                            </FormControl>

                            <Grid container columns={12} spacing={2}>
                                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ mb: 1, fontWeight: 500 }}>Appointment Date</FormLabel>
                                        <TextField
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            {...register("appointmentDate")}
                                            error={!!errors.appointmentDate}
                                            helperText={errors.appointmentDate?.message}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid sx={{ gridColumn: { xs: 'span 6', sm: 'span 3' } }}>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ mb: 1, fontWeight: 500 }}>From</FormLabel>
                                        <TextField
                                            type="time"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            {...register("timeSlotFrom")}
                                            error={!!errors.timeSlotFrom}
                                            helperText={errors.timeSlotFrom?.message}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid sx={{ gridColumn: { xs: 'span 6', sm: 'span 3' } }}>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ mb: 1, fontWeight: 500 }}>To</FormLabel>
                                        <TextField
                                            type="time"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            {...register("timeSlotTo")}
                                            error={!!errors.timeSlotTo}
                                            helperText={errors.timeSlotTo?.message}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 1, fontWeight: 500 }}>Additional Notes</FormLabel>
                                <TextField
                                    multiline
                                    rows={3}
                                    fullWidth
                                    placeholder="Any special requests or notes..."
                                    {...register("notes")}
                                    error={!!errors.notes}
                                    helperText={errors.notes?.message}
                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontWeight: 600,
                                    backgroundColor: "#4e73df",
                                    "&:hover": { backgroundColor: "#2d59c9" }
                                }}
                            >
                                Book Appointment
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>
        </>

    );
}