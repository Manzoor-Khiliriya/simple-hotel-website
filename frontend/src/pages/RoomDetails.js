import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRoomById } from "../services/roomsApiServices";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Divider,
  Chip,
  Stack
} from "@mui/material";
import { styled } from '@mui/system';
import HeadingTypography from "../components/customHeading/HeadingTypography.js";

const StyledCard = styled(Card)({
  borderRadius: 16,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  paddingBottom: '20px',
  backgroundColor: '#FFFFFF',
  textAlign: 'center',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
  }
});

const RoomDetails = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const data = await fetchRoomById(roomId);
        setRoomDetails(data);
      } catch (error) {
        setError(error.message || "Unable to fetch room details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
        <CircularProgress size={60} color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default">
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#DFAA5B' }}>
      <StyledCard sx={{ maxWidth: 600, width: '90%' }}>
        {roomDetails.image && (
          <CardMedia
            component="img"
            height="250"
            image={roomDetails.image}
            alt={roomDetails.roomType}
            sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          />
        )}

        <CardContent>
          <HeadingTypography text="Room Details" mb={1} />
          <Divider sx={{ marginBottom: 3 }} />

          <Typography variant="h6" color="primary">Room Type</Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
            {roomDetails.roomType || "N/A"}
          </Typography>

          <Typography variant="h6" color="secondary">Rate</Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
            ${roomDetails.rate || "N/A"}
          </Typography>

          {roomDetails.cityName && (
            <>
              <Typography variant="h6" color="text.secondary">City</Typography>
              <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
                {roomDetails.cityName}
              </Typography>
            </>
          )}

          {roomDetails.features?.length > 0 && (
            <>
              <Typography variant="h6" color="success.main">Features</Typography>
              <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mt: 1 }}>
                {roomDetails.features.map((feature, idx) => (
                  <Chip key={idx} label={feature} color="default" />
                ))}
              </Stack>
            </>
          )}
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default RoomDetails;
