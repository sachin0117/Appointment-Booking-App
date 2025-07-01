import {
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  InputAdornment,
  IconButton,
  Paper,
  Alert,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";

const schema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .required("Password is required"),
});

type FormType = {
  email: string;
  password: string;
};

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    setLoading(true);
    setTimeout(() => {
      const storedData = localStorage.getItem("userData");
      if (!storedData) {
        setLoading(false);
        setError("No users found. Please sign up first.");
        return;
      }
      const userData = JSON.parse(storedData);
      if (!Array.isArray(userData)) {
        setLoading(false);
        setError("User data is corrupted. Please sign up again.");
        return;
      }
      const foundUser = userData.find(
        (user: any) => user.email === data.email && user.password === data.password
      );
      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        setLoading(false);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Box
      sx={{
        marginTop: "230px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "hidden",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 400,
          px: 4,
          py: 4,
          borderRadius: 4,
          bgcolor: "#ffffffee",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom color="primary">
          Sign In
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary" mb={2}>
          Login to access your dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Email"
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                borderRadius: 3,
                fontWeight: "bold",
                py: 1.2,
                background: "linear-gradient(to right, #007BFF, #00C6FF)",
                "&:hover": {
                  background: "linear-gradient(to right, #0062E6, #33AEFF)",
                },
              }}
            >
              {loading ? <CircularProgress size={28} sx={{ color: "white" }} /> : "Sign In"}
            </Button>
          </Stack>
        </form>

        <Typography textAlign="center" mt={2} fontSize="0.875rem">
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#007BFF", fontWeight: 500, textDecoration: "none" }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
