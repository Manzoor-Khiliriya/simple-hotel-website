import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRoomById } from "../services/roomsApiServices";
import { Card, CardContent, Typography, CircularProgress, Box, Divider } from "@mui/material";
import { styled } from '@mui/system';
import HeadingTypography from "../components/customHeading/HeadingTypography.js";

const StyledCard = styled(Card)({
  borderRadius: 16,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  backgroundColor: '#FFFFFF',
  textAlign: 'center',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
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
      <StyledCard sx={{ maxWidth: 600 }}>
        <CardContent>
          <HeadingTypography text="Room Details" mb={0}/>
          <Divider sx={{ marginBottom: 2 }} />
          
          <Typography variant="h6" color="primary">
            Room Type:
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
            {roomDetails.roomType}
          </Typography>
          
          <Typography variant="h6" color="secondary">
            Rate:
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
            ${roomDetails.rate}
          </Typography>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default RoomDetails;
