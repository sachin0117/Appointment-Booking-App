import { useState } from "react";
import { Button, TextField, Typography, Stack, CircularProgress, InputAdornment, IconButton, Paper, Alert, Box, Link, Fade, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Email, Lock, } from "@mui/icons-material";

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .required("Password is required"),
});

type FormType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
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
    setError("");
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
        (user: any) =>
          user.email === data.email && user.password === data.password
      );
      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        setLoading(false);
        setSnackbar({ open: true, message: "Login successful!", severity: "success" });
        setTimeout(() => navigate("/dashboard"), 1200);
      } else {
        setError("Invalid email or password");
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
              Welcome
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to access your account
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
                label="Email"
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
                    boxShadow: "0 4px 12px rgba(33, 150, 243, 0.25)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </Stack>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                href="/signup"
                color="primary"
                sx={{ fontWeight: 600, textDecoration: "none" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}