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
  Alert,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
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
  role: Yup.string().oneOf(["user", "admin"], "Invalid role").required("Role is required"),
});

type FormType = {
  email: string;
  password: string;
  role: "user" | "admin";
};

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    setLoading(true);
    setTimeout(() => {
      const storedData = localStorage.getItem("userData");
      if (!storedData) {
        setLoading(false);
        return;
      }
      const userData = JSON.parse(storedData);
      if (
        data.email === userData.email &&
        data.password === userData.password &&
        data.role === userData.role
      ) {
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
        marginTop:"230px",
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
            <FormControl fullWidth size="small" error={!!errors.role}>
              <InputLabel id="role-label">Role</InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select labelId="role-label" label="Role" {...field}>
                    <MenuItem value="">
                      <em>Select role</em>
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
                borderRadius: 3,
                fontWeight: "bold",
                py: 1.2,
                background: "linear-gradient(to right, #007BFF, #00C6FF)",
                "&:hover": {
                  background: "linear-gradient(to right, #0062E6, #33AEFF)",
                },
              }}
            >
              {loading ? <CircularProgress size={28} sx={{color:"white"}} /> : "Sign In"}
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
