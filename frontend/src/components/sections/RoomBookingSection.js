import React from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationButton from "../customButtons/NavigationButton";

export default function RoomBookingSection() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'block',
                p: 5,
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" sx={{ mb: 2, color: '#957554' }}>
                Get a room already!
            </Typography>
            <NavigationButton width={{ xs: '50%', md: '25%' }} fontSize={22} height={76} onClick={() => navigate("/room-booking")}>
                Book now
            </NavigationButton>
        </Box>
    );
}
