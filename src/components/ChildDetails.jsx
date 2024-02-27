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

const Page = () => {
   const navigate = useNavigate();

   const isLoading = false
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
            console.log(values)
            navigate('/home')
         } catch (err) {
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
                        <MenuItem value={'Female'}>Female</MenuItem>
                     </Select>
                     <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                  </FormControl>
               </Grid>
               <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Date of Birth" defaultValue={dayjs()} />
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


