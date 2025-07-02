import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, FormLabel, Paper, Stack, TextField, Typography, Divider, Snackbar, Alert, } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useState } from "react";

type ManagerServicesProps = {
    id: string;
    addService: string;
    description: string;
    adminEmail?: string;
};

type ManageServicesFields = Omit<ManagerServicesProps, "id">;

const schema = Yup.object({
    addService: Yup.string().required("Service Type is required"),
    description: Yup.string().required("Description is required"),
});

export default function ManagerServices() {
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
    const userData = localStorage.getItem("currentUser");
    const currentUser = userData ? JSON.parse(userData) : null;
    const [services, setServices] = useState<ManagerServicesProps[]>(() => {
        const stored = localStorage.getItem("services");
        const allServices = stored ? JSON.parse(stored) : [];
        return currentUser
            ? allServices.filter((s: ManagerServicesProps) => s.adminEmail === currentUser.email)
            : [];
    });


    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<ManageServicesFields>({
        defaultValues: {
            addService: "",
            description: "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ManageServicesFields) => {
        const newService = { ...data, id: Date.now().toString(), adminEmail: currentUser.email };
        const updatedServices = [...services, newService];
        setServices(updatedServices);
        const stored = localStorage.getItem("services");
        const allServices = stored ? JSON.parse(stored) : [];
        const allUpdated = [...allServices, newService];
        localStorage.setItem("services", JSON.stringify(allUpdated));
        setSnackbar({ open: true, message: "Service added successfully!", severity: "success" });
        reset();
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
                    overflow: "hidden",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        maxWidth: 600,
                        width: "100%",
                        borderRadius: 2,
                        maxHeight: "80vh",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            mb: 3,
                            fontWeight: 600,
                            color: "#2d3748",
                        }}
                    >
                        Manage Services
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack spacing={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 1, fontWeight: 500 }}>Service Type</FormLabel>
                                <TextField
                                    fullWidth
                                    placeholder="Enter service type"
                                    {...register("addService")}
                                    error={!!errors.addService}
                                    helperText={errors.addService?.message}
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <FormLabel sx={{ mb: 1, fontWeight: 500 }}>Description</FormLabel>
                                <TextField
                                    multiline
                                    rows={3}
                                    placeholder="Add service description..."
                                    {...register("description")}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{
                                    mt: 1,
                                    py: 1.5,
                                    fontWeight: 600,
                                    backgroundColor: "#4e73df",
                                    "&:hover": { backgroundColor: "#2d59c9" },
                                }}
                            >
                                Add Service
                            </Button>
                        </Stack>
                    </form>

                    <Divider sx={{ my: 4 }} />

                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            pr: 1,
                            maxHeight: "30vh",
                        }}
                    >
                        {services.length === 0 ? (
                            <Typography>No services added yet.</Typography>
                        ) : (
                            <Stack spacing={2}>
                                {services.map((service) => (
                                    <Box
                                        key={service.id}
                                        sx={{
                                            p: 2,
                                            borderRadius: 1,
                                            backgroundColor: "#f9fafc",
                                            border: "1px solid #e0e0e0",
                                        }}
                                    >
                                        <Typography fontWeight={600}>{service.addService}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {service.description}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Paper>
            </Box>
        </>

    );
}
