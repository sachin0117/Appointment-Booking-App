import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Stack,
    CircularProgress,
    InputAdornment,
    IconButton,
    Paper,
    Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Person, Email, Lock } from "@mui/icons-material";


const schema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .required("Password is required"),
    role: Yup.string().oneOf(["user", "admin"], "Invalid role").required("Role is required"),
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
        setTimeout(() => {
            localStorage.setItem("userData", JSON.stringify(data));
            setLoading(false);
            setTimeout(() => {
                navigate("/signin");
                reset();
            }, 1500);
        }, 2000);
    };

    return (
        <>

            <Box
                sx={{
                    marginTop: "180px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        width: "100%",
                        maxWidth: 450,
                        px: 4,
                        py: 5,
                        borderRadius: 5,
                        bgcolor: "#ffffffee",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom color="primary">
                        Create Your Account
                    </Typography>
                    <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                        Join us and start booking appointments with ease
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack spacing={2}>
                            <TextField
                                label="Full Name"
                                fullWidth
                                size="small"
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
                            />
                            <TextField
                                label="Email Address"
                                type="email"
                                fullWidth
                                size="small"
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
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                size="small"
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
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControl fullWidth size="small" error={!!errors.role}>
                                <InputLabel id="role-label">Select Role</InputLabel>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select labelId="role-label" label="Select Role" {...field}>
                                            <MenuItem value="">
                                                <em>Choose your role</em>
                                            </MenuItem>
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    )}
                                />
                                {errors.role && (
                                    <Typography variant="caption" color="error">
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
                                    mt: 1,
                                    borderRadius: 3,
                                    py: 1.2,
                                    fontWeight: "bold",
                                    background: "linear-gradient(to right, #007BFF, #00C6FF)",
                                    boxShadow: "0 4px 20px rgba(0, 123, 255, 0.3)",
                                    "&:hover": {
                                        background: "linear-gradient(to right, #0062E6, #33AEFF)",
                                    },
                                }}
                            >
                                {loading ? <CircularProgress size={28} sx={{color:"white"}} /> : "Sign Up"}
                            </Button>
                        </Stack>
                    </form>

                    <Typography textAlign="center" mt={3} fontSize="0.875rem">
                        Already have an account?{" "}
                        <Link to="/signin" style={{ color: "#007BFF", fontWeight: 500, textDecoration: "none" }}>
                            Log in
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </>
    );
}
