import React, { useState } from "react";
import { TextField, Typography, Box, CircularProgress, FormHelperText } from "@mui/material";
import Grid from '@mui/material/Grid2'
import logo1 from "../assets/images/image 1.png";
import NavigationButton from "./customButtons/NavigationButton";
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import { subscribeCustomer } from "../services/customersApiServices";
import { validateEmail } from "../utils/validaters";
import { useForm } from "react-hook-form";
import { commonFormStyles } from "../styles/commonFormStyles";

export default function Footer() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async (data) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await subscribeCustomer(data.email);
      alert(result.message);
      setValue("email", "");
    } catch (error) {
      alert(error.message || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };



  const quickLinks = ["Our Hotels", "Our Conferencing", "Our Company", "Hotel Design", "Careers"];

  return (
    <section id="footer-section">
      <Box sx={{ backgroundColor: "#111111", color: "white", padding: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box>
              <img src={logo1} alt="logo" height={100} />
              <Typography variant="body1">Bon Hotels Head Office <br /> +12 345 678 900 <br /> abc@bonhotels.com</Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Box>
              <Typography variant="h6" pb={2}>Quick Links</Typography>
              {quickLinks.map((link, index) => (
                <Link component={NavLink} key={index} to="/" color="inherit" underline="none" sx={{ display: 'block', mb: '6px', '&:hover': { textDecoration: 'underline' } }} >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Box>
              <Typography variant="h6" gutterBottom>Subscribe for Offers</Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  {...register("email", {
                    required: "* Please enter an email.",
                    validate: validateEmail
                  })}
                  error={Boolean(errors.email)}
                  sx={{
                    ...commonFormStyles,
                    mb: 1,
                    '& .MuiInputLabel-root': {
                      color: '#a47d5c'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#a47d5c'
                    },
                  }}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'red', mb: 1 }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
                <NavigationButton height={60} type="submit">
                  {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Subscribe now"}
                </NavigationButton>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
}
