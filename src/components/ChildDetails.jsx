import { useFormik } from "formik";
import * as Yup from "yup";
import {
   Button,
   CircularProgress,
   Container,
   FormControl,
   FormHelperText,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   Stack,
   TextField,
   Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { useState } from "react";
import { Error } from "@mui/icons-material";
import Axios from "../helpers/axios";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
   const user = useSelector(state => state?.data?.user)
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState('')
   const dispatch = useDispatch()
   const formik = useFormik({
      initialValues: {
         name: "",
         nickname: "",
         gender: "male",
         dob: dayjs(),
         submit: null,
      },
      validationSchema: Yup.object({
         name: Yup.string()
            .required("Name is Required")
            .min(3, "Name must have atleast 3 characters"),
         nickname: Yup.string()
            .required("Nickname is Required")
            .min(3, "Nickname must have atleast 3 characters"),
         gender: Yup.string()
            .required("Gender is Required")
      }),
      onSubmit: async (values, helpers) => {
         try {
            setIsLoading(true)
            await Axios.post(`/user/update/${user?.id}`, values).then(res => {
               console.log(res.data);
               dispatch({ type: 'user_login', payload: res?.data?.data })
               navigate('/home')
            })
            setIsLoading(false)
         } catch (err) {
            setError(err?.response?.data?.message || 'Something went wrong !')
            setIsLoading(false)
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
         }
      },
   });


   return (
      <Container>
         <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
               <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  <TextField
                     error={!!(formik.touched.name && formik.errors.name)}
                     fullWidth
                     helperText={formik.touched.name && formik.errors.name}
                     label="Name"
                     name="name"
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                     type="text"
                     value={formik.values.name}
                  />
               </Grid>
               <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  <TextField
                     error={!!(formik.touched.nickname && formik.errors.nickname)}
                     fullWidth
                     helperText={formik.touched.nickname && formik.errors.nickname}
                     label="Nickname"
                     name="nickname"
                     onBlur={formik.handleBlur}
                     onChange={formik.handleChange}
                     type="text"
                     value={formik.values.nickname}
                  />
               </Grid>
               <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  <FormControl sx={{ minWidth: 120 }} fullWidth>
                     <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                     <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={formik.values.gender}
                        label="Gender"
                        name="gender"
                        onChange={formik.handleChange}
                     >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                     </Select>
                     <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                  </FormControl>
               </Grid>
               <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoContainer components={['DatePicker']}>
                        <DatePicker
                           label="Date of Birth"
                           defaultValue={dayjs().subtract(3, 'year')}
                           maxDate={dayjs().subtract(3, 'year')}
                        />
                     </DemoContainer>
                  </LocalizationProvider>
               </Grid>

               <Grid item xs={12} sx={{ ml: "3em", mr: "3em", mt: '1rem' }}>
                  {isLoading ? (
                     <CircularProgress size={20} />
                  ) : (
                     <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                     >Create account</Button>
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
         </form>
      </Container>
   );
};

export default Page;


