import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, FormControl, InputLabel, Select, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { fetchRooms } from "../../services/roomsApiServices";
import NavigationButton from "../customButtons/NavigationButton";
import { validateDates } from "../../utils/validaters";
import { commonFormStyles } from "../../styles/commonFormStyles";

export default function AvailabilityCheckForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [rooms, setRooms] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        setFetchError(err.message || "Failed to load rooms. Please try again later.");
      }
    };

    getRooms();
  }, []);

  const uniqueCities = useMemo(() => [...new Set(rooms.map((room) => room.cityName))], [rooms]);

  

  const onSubmit = (data) => {
    navigate("/available-rooms", { state: { ...data } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} justifyContent="center" sx={{ padding: 4, borderRadius: 2 }}>

        {/* City Selection */}
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{...commonFormStyles,
              '& .MuiInputLabel-root': {
                color: '#000000',
                backgroundColor: 'white',
                padding: '0 5px'
            }
            } }
            error={!!errors.cityName}
          >
            <InputLabel
              id="city-label"
            >
              Select a city
            </InputLabel>
            <Select
              labelId="city-label"
              {...register("cityName", { required: "*City is required" })}
              defaultValue=""
              onChange={(e) => setValue("cityName", e.target.value)}
            >
              <MenuItem value="" disabled sx={{ fontSize: "14px" }}>
                Select a city
              </MenuItem>
              {uniqueCities.length > 0 ? (
                uniqueCities.map((city) => (
                  <MenuItem key={city} value={city} sx={{ fontSize: "14px" }}>
                    {city}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled sx={{ fontSize: "14px" }}>
                  No cities available
                </MenuItem>
              )}
            </Select>
          </FormControl>
          {errors.cityName && (
            <Typography color="error" sx={{ fontSize: "12px",ml: 2, mt:'3px' }}>
              {errors.cityName.message}
            </Typography>
          )}
        </Grid>


        {/* Check-in Date */}
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <TextField
            {...register("checkInDate", { required: "*Check-in date is required" })}
            label="Check In Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={commonFormStyles}
            error={!!errors.checkInDate}
            helperText={errors.checkInDate?.message}
          />
        </Grid>

        {/* Check-out Date */}
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <TextField
            {...register("checkOutDate", {
              required: "*Check-out date is required",
              validate: (value) => validateDates(value, watch)
            })}
            label="Check Out Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={commonFormStyles}
            error={!!errors.checkOutDate}
            helperText={errors.checkOutDate?.message}
          />
        </Grid>

        {/* Submit Button */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <NavigationButton type="submit" height={55}  fontSize="14px">
            Check Availability
          </NavigationButton>
        </Grid>

        {/* Error Message */}
        {fetchError && (
          <Grid size={{ xs: 12 }}>
            <Typography color="error" align="center">{fetchError}</Typography>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
