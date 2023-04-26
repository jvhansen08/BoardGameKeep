import { ArrowBack } from "@mui/icons-material";
import {
  Alert,
  Button,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { formikTextFieldProps } from "../utils/helperFunctions";
import { LoadingButton } from "@mui/lab";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Required"),
      password: yup.string().required("Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // api.post('users/login', {
      //     password: values.password,
      //     email: values.email,
      // })
      //     .then((res) => {
      //         if (res.token) {
      //             window.localStorage.setItem('token', res.token)
      //             navigate('/')
      //         } else {
      //             setError(res.message)
      //         }
      //     })
      //     .then(() => setSubmitting(false))
    },
  });

  useEffect(() => {
    const handleKeyPress = (event: { key: string }) => {
      if (event.key === "Enter") {
        formik.submitForm();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [formik]);

  return (
    <Container maxWidth="md">
      <CardHeader>Login</CardHeader>
      <CardContent>
        <Stack gap="2em">
          <Stack direction="row">
            <IconButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" align="center" width="100%" sx={{ mr: 5 }}>
              Sign In
            </Typography>
          </Stack>
          <TextField
            {...formikTextFieldProps(formik, "email", "Email")}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            {...formikTextFieldProps(formik, "password", "Password")}
            helperText={formik.touched.password && formik.errors.password}
            type="password"
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Stack direction="row" justifyContent="center">
            <LoadingButton
              variant="contained"
              onClick={formik.submitForm}
              loading={formik.isSubmitting}
            >
              Login
            </LoadingButton>
          </Stack>

          <Stack direction="row" gap="1rem" justifyContent="center">
            <Button
              variant="text"
              onClick={() => navigate("/create-account")}
              sx={{ mx: 2 }}
            >
              Create Account
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Container>
  );
};
