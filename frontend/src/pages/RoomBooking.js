import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchRooms } from "../services/roomsApiServices.js";
import { TextField, MenuItem, Select, InputLabel, FormControl, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import BackButton from "../components/customButtons/BackButton.js";
import HeadingTypography from "../components/customHeading/HeadingTypography.js";
import NavigationButton from "../components/customButtons/NavigationButton.js";
import { validateContactNumber, validateDates, validateEmail } from "../utils/validaters.js";
import { fetchBooking } from "../services/bookingApiServices.js";
import { commonFormStyles } from "../styles/commonFormStyles.js";

export default function RoomBooking() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm();

  useEffect(() => {
    async function roomDetails() {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        setError(err.message || "Could not fetch room details");
      }
    }
    roomDetails();
  }, []);

  const cities = [...new Set(rooms.map((room) => room.cityName))];
  const roomTypes = [...new Set(rooms.map((room) => room.roomType))];

  const onSubmit = async (bookingData) => {
    try {
      const result = await fetchBooking(bookingData);
      alert(result.message || "Booking successful: "); 
    } catch (error) {
      alert("Booking failed: " || error.message);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#DFAA5B', p: 3 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: '450px',
          margin: 'auto',
          backgroundColor: '#ffffff',
          padding: '20px 15px',
          borderRadius: '6px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <HeadingTypography text="BOOK YOUR ROOM" />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Name"
              fullWidth
              {...register("customerName", { required: "*Name is required" })}
              error={!!errors.customerName}
              helperText={errors.customerName?.message}
              sx={commonFormStyles}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              {...register("customerEmail", {
                required: "*Email is required",
                validate: validateEmail
              })}
              error={!!errors.customerEmail}
              helperText={errors.customerEmail?.message}
              sx={commonFormStyles}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Contact Number"
              type="tel"
              fullWidth
              {...register("customerContactNumber", {
                required: "*Contact number is required",
                validate: validateContactNumber
              })}
              error={!!errors.customerContactNumber}
              helperText={errors.customerContactNumber?.message}
              sx={commonFormStyles}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} >
            <FormControl fullWidth error={!!errors.cityName} sx={commonFormStyles} >
              <InputLabel>City</InputLabel>
              <Select
                {...register("cityName", { required: "*City Name is required" })}
                onChange={(e) => setValue("cityName", e.target.value)}
              >
                <MenuItem value="" disabled sx={{ fontSize: '14px' }}>Select a city</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city} value={city} sx={{ fontSize: '14px' }}>{city}</MenuItem>
                ))}
              </Select>
              {errors.cityName && <Typography color="error" sx={{ fontSize: '12px', ml: 2, mt: '3px' }}>{errors.cityName.message}</Typography>}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} >
            <FormControl fullWidth error={!!errors.roomType} sx={commonFormStyles}>
              <InputLabel >Room Type</InputLabel>
              <Select
                {...register("roomType", { required: "*Room type is required" })}
                onChange={(e) => setValue("roomType", e.target.value)}
              >
                <MenuItem value="" disabled sx={{ fontSize: '14px' }}>Select room type</MenuItem>
                {roomTypes.map((type) => (
                  <MenuItem key={type} value={type} sx={{ fontSize: '14px' }}>{type}</MenuItem>
                ))}
              </Select>
              {errors.roomType && <Typography color="error" sx={{ fontSize: '12px', ml: 2, mt: '3px' }}>{errors.roomType.message}</Typography>}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Check-in Date"
              type="date"
              fullWidth
              {...register("checkInDate", { required: "*Check-in date is required" })}
              error={!!errors.checkInDate}
              helperText={errors.checkInDate?.message}
              InputLabelProps={{ shrink: true }}
              sx={commonFormStyles}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Check-out Date"
              type="date"
              fullWidth
              {...register("checkOutDate", {
                required: "*Check-out date is required",
                validate: (value) => validateDates(value, watch)
              })}
              error={!!errors.checkOutDate}
              helperText={errors.checkOutDate?.message}
              InputLabelProps={{ shrink: true }}
              sx={commonFormStyles}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <NavigationButton
              type="submit"
              borderRadius={1}
              fontSize="14px"
              fontWeight="500">
              Submit
            </NavigationButton>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <BackButton fullWidth>Back to Home</BackButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
