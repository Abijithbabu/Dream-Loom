
// importing mui components
import {
  Grid,
  Typography,
  Container,
  Stack,
  CircularProgress,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import TextFieldWrapper from "./TextField";
import ButtonWrapper from "./ButtonWrapper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "../helpers/axios";
import { Error } from "@mui/icons-material";

// Initial form state for formik
const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

});
const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  // Submit Handler for Registration
  const submitHandler = async (values) => {
    try {
      console.log(values)
      setIsLoading(true)
      await Axios.post('/user/signin', values).then(res => {
        console.log(res?.data);
        dispatch({ type: 'user_login', payload: res?.data?.data })
        navigate("/home");
      })
      setIsLoading(false)
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong !')
      setIsLoading(false)
      console.log(err?.response?.data?.message || err.error || err);
    }
  };
  return (
    <Container>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              <TextFieldWrapper name="email" label="Email" />
            </Grid>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              <TextFieldWrapper name="password" label="Password" />
            </Grid>
            <Grid item xs={12} sx={{ ml: "3rem", mr: "3rem" }}>
              <Stack direction="row" spacing={2}>
                <Typography
                  variant="body1"
                  component="span"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                  style={{
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  Forgot password?
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              {isLoading ? (
                <CircularProgress size={20} />
              ) : (
                <ButtonWrapper>Sign In</ButtonWrapper>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                ml: "3em",
                mr: "3em",
              }}
            >
              {error && <Stack direction="row" justifyContent={'center'} spacing={1}>
                <Error color="error" />
                <Typography color="error">{error}</Typography>
              </Stack>}
              <Stack direction="row" spacing={2}>
                <Typography
                  variant="body1"
                  component="span"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Not registered yet?{" "}
                  <span
                    style={{
                      color: "#beb4fb",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Create an Account
                  </span>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;