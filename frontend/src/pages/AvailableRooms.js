import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchRoomByQuery } from "../services/roomsApiServices.js";
import { Card, CardContent, Typography, CircularProgress, Box, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import BackButton from "../components/customButtons/BackButton.js";
import HeadingTypography from "../components/customHeading/HeadingTypography.js";
import { Link } from "react-router-dom";

export default function AvailableRooms() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const { cityName, checkInDate, checkOutDate } = location.state || {};

  useEffect(() => {
    if (!cityName || !checkInDate || !checkOutDate) {
      setError("Please provide a valid city and date range.");
      setIsLoading(false);
      return;
    }

    const fetchRoomsData = async () => {
      try {
        const formData = { cityName, checkInDate, checkOutDate };
        const data = await fetchRoomByQuery(formData);
        setRooms(data);
      } catch (error) {
        setError(error.message || "Failed to fetch rooms. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomsData();
  }, [cityName, checkInDate, checkOutDate]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" minHeight="50vh" sx={{ p: 3, backgroundColor: "#DFAA5B" }}>
      <HeadingTypography text="AVAILABLE ROOMS" />

      {isLoading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : rooms.length ? (
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room._id} sx={{ display: "flex" }}>
              <Link
                to={`/room-details/${room._id}`}
                style={{
                  textDecoration: "none",
                  flex: 1
                }}
              >
                <Card
                  sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    height: "100%",
                    "&:hover": { transform: "translateY(-5px)", transition: "transform 0.3s" },
                  }}
                >
                  <CardContent sx={{ fontWeight: "600" }}>
                    <Typography variant="h6" sx={{ color: "#4CAF50", fontWeight: 600 }}>
                      Room Type: {room.roomType || "N/A"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555", fontWeight: 600 }}>
                      Rate: ${room.rate || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="error" sx={{ mx: 'auto', fontSize: '16px', color: '#d32f2f', backgroundColor: '#f8d7da' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <BackButton>Check another city or date</BackButton>
      </Box>
    </Box>
  );
}
