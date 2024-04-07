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
import axios from "../helpers/axios";
import { Error } from "@mui/icons-material";
import { useDispatch } from "react-redux";
// Initial form state for formik
const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string()
    .required("Username is Required")
    .min(3, "Name must have atleast 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

});

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  // Submit Handler for Registration
  const submitHandler = async (values) => {
    try {
      console.log(values)
      setIsLoading(true)
      await axios.post('/user/signup', values).then(res => {
        console.log(res?.data);
        dispatch({ type: 'user_signup', payload: res?.data?.data })
        navigate("/set-child-profile");
      })
      setIsLoading(false)
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong !')
      setIsLoading(false)
      console.log(err?.response?.data?.message || err.error || err);
    }
  };

  return (
    <>
      <Container>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={submitHandler}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <TextFieldWrapper name="username" label="Username" />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <TextFieldWrapper name="email" label="Email" />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <TextFieldWrapper
                  name="password"
                  label="Password"
                />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em", mt: '1rem' }}>
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <ButtonWrapper>Register</ButtonWrapper>
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
                    Already have an account?{" "}
                    <span
                      style={{
                        color: "#beb4fb",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Go to Sign in
                    </span>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default Register;