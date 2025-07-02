import { useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Stack,
    CircularProgress,
    InputAdornment,
    IconButton,
    Paper,
    Box,
    Link,
    Fade,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Alert,
    Snackbar
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Person, Email, Lock } from "@mui/icons-material";

const schema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .required("Password is required"),
    role: Yup.string()
        .oneOf(["user", "admin"], "Invalid role")
        .required("Role is required"),
});

type FormType = {
    fullname: string;
    email: string;
    password: string;
    role: "user" | "admin";
};

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormType>({
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            role: undefined,
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormType) => {
        setLoading(true);
        setError("");
        setTimeout(() => {
            try {
                const existingUsers = JSON.parse(localStorage.getItem("userData") || "[]");
                const isDuplicate = existingUsers.some((user: any) => user.email === data.email);

                if (isDuplicate) {
                    setError("Email already exists. Please use a different email.");
                    setLoading(false);
                    return;
                }

                const updatedUsers = Array.isArray(existingUsers)
                    ? [...existingUsers, data]
                    : [data];

                localStorage.setItem("userData", JSON.stringify(updatedUsers));
                setLoading(false);
                setSnackbar({ open: true, message: "Account created successful!", severity: "success" });
                reset();
                setTimeout(() => {
                    navigate("/signin");
                }, 1200);
            } catch (err) {
                setError("Failed to sign up. Please try again.");
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
                p: 2,
            }}
        >
            <Fade in={true} timeout={500}>
                <Paper
                    elevation={0}
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        p: 4,
                        borderRadius: 3,
                        bgcolor: "white",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(0,0,0,0.05)",
                    }}
                >
                    <Box textAlign="center" mb={3}>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            gutterBottom
                            color="primary"
                            sx={{ letterSpacing: -0.5 }}
                        >
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Join us to start booking appointments
                        </Typography>
                    </Box>

                    {error && (
                        <Fade in={!!error}>
                            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                                {error}
                            </Alert>
                        </Fade>
                    )}
                    <Snackbar
                        open={snackbar.open}
                        autoHideDuration={2000}
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
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack spacing={2.5}>
                            <TextField
                                label="Full Name"
                                fullWidth
                                size="medium"
                                {...register("fullname")}
                                error={!!errors.fullname}
                                helperText={errors.fullname?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                            <TextField
                                label="Email Address"
                                type="email"
                                fullWidth
                                size="medium"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                size="medium"
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="primary" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff color="primary" />
                                                ) : (
                                                    <Visibility color="primary" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                            <FormControl fullWidth size="medium" error={!!errors.role}>
                                <InputLabel id="role-label">Select Role</InputLabel>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            labelId="role-label"
                                            label="Select Role"
                                            {...field}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                },
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Choose your role</em>
                                            </MenuItem>
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.role && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                        {errors.role.message}
                                    </Typography>
                                )}
                            </FormControl>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    py: 1.5,
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    boxShadow: "none",
                                    "&:hover": {
                                        boxShadow: "0 4px 12px rgba(0, 123, 255, 0.25)",
                                    },
                                    mt: 1,
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} sx={{ color: "white" }} />
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </Stack>
                    </form>

                    <Box mt={3} textAlign="center">
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                color="primary"
                                sx={{ fontWeight: 600, textDecoration: "none" }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Fade>
        </Box>
    );
}