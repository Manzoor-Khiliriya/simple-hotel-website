import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Box,
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { fetchRoomsByType } from '../services/roomsApiServices.js';
import BackButton from '../components/customButtons/BackButton.js';
import HeadingTypography from '../components/customHeading/HeadingTypography.js';

export default function RoomsTypeInfo() {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const roomType = searchParams.get('roomType');

  useEffect(() => {
    async function roomDetails() {
      try {
        setIsLoading(true);
        const data = await fetchRoomsByType(roomType);
        setRooms(data);
      } catch (error) {
        setError(error.message || "Unable to fetch room details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    if (roomType) {
      roomDetails();
    }
  }, [roomType]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="50vh"
      sx={{ padding: 3, backgroundColor: "#DFAA5B" }}
    >
      <HeadingTypography text={`${roomType ? roomType.toUpperCase() : "ROOM"} ROOMS`} />

      <Grid container spacing={3} justifyContent="center">
        {isLoading ? (
          <Grid size={{ xs: 12 }} container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room._id}>
              <Link
                to={`/room-details/${room._id}`}
                style={{ textDecoration: "none", display: "block", height: "100%" }}
              >
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 2,
                    height: "100%",
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.01)' }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {room.roomType.toUpperCase()}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      City: {room.cityName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Rate: ${room.rate}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Alert
              severity="error"
              sx={{
                mx: 'auto',
                fontSize: '16px',
                color: '#d32f2f',
                backgroundColor: '#f8d7da',
                textAlign: 'center'
              }}
            >
              {error}
            </Alert>
          </Grid>
        )}

        <Grid container size={{ xs: 12 }} justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
          <BackButton>
            Back to home
          </BackButton>
        </Grid>
      </Grid>
    </Box>
  );
}
