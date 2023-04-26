import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Container,
  Card,
  CardContent,
  Alert,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { formikTextFieldProps } from "../utils/helperFunctions";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const navigateToHome = () => {
    navigate("/dashboard");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      emailValidation: "",
      password: "",
      passwordValidation: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      email: yup.string().email().required("Required"),
      emailValidation: yup.string().email().required("Required"),
      password: yup.string().required("Required"),
      passwordValidation: yup.string().required("Required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setError(null);
      const errors = [];

      if (values.email !== values.emailValidation) {
        errors.push("Emails do not match");
      }

      if (values.password !== values.passwordValidation) {
        errors.push("Passwords do not match");
      }

      if (errors.length > 0) {
        setError(errors.join(", "));
        setSubmitting(false);
        return;
      }
      // api.post('users', {
      //     firstName: values.firstName,
      //     lastName: values.lastName,
      //     password: values.password,
      //     email: values.email,
      // })
      //     .then((res: { token: string; message: string }) => {
      //         if (res.token) {
      //             window.localStorage.setItem('token', res.token)
      //             navigateToHome()
      //         } else {
      //             setError(res.message)
      //         }
      //     })
      //     .then(() => setSubmitting(false))
    },
  });

  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 24, mb: 24 }}>
        <CardContent>
          <Stack gap="2rem" justifyContent="center">
            <Stack direction="row">
              <IconButton onClick={navigateToHome}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h4"
                align="center"
                width="100%"
                sx={{ mr: 5 }}
              >
                Create Account
              </Typography>
            </Stack>
            <TextField
              {...formikTextFieldProps(formik, "firstName", "First Name")}
            />
            <TextField
              {...formikTextFieldProps(formik, "lastName", "Last Name")}
            />
            <TextField
              {...formikTextFieldProps(formik, "email", "Email")}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              {...formikTextFieldProps(
                formik,
                "emailValidation",
                "Confirm Email"
              )}
              helperText={
                formik.touched.emailValidation && formik.errors.emailValidation
              }
            />
            <TextField
              {...formikTextFieldProps(formik, "password", "Password")}
              helperText={formik.touched.password && formik.errors.password}
              type="password"
            />
            <TextField
              {...formikTextFieldProps(
                formik,
                "passwordValidation",
                "Confirm Password"
              )}
              helperText={
                formik.touched.passwordValidation &&
                formik.errors.passwordValidation
              }
              type="password"
            />

            {error && <Alert severity="error">{error}</Alert>}
            <Stack direction="row" justifyContent="center">
              <LoadingButton
                variant="contained"
                onClick={formik.submitForm}
                loading={formik.isSubmitting}
              >
                Create Account
              </LoadingButton>
            </Stack>

            <Stack direction="row" gap="1rem" justifyContent="center">
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{ mx: 2 }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};
