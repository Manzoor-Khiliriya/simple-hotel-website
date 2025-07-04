import React from 'react';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import kitchen from "../../assets/images/dashicons_editor-kitchensink.png";
import pool from "../../assets/images/ic_twotone-pool.png";
import wifi from "../../assets/images/clarity_wifi-solid.png";
import gym from "../../assets/images/maki_fitness-centre-11.png";
import taxi from "../../assets/images/bx_bx-taxi.png";
import hotel from "../../assets/images/hotel.png";
import HeadingTypography from '../customHeading/HeadingTypography.js';
import NavigationButton from '../customButtons/NavigationButton.js';

const facilities = [
    { src: kitchen, label: 'Kitchen' },
    { src: pool, label: 'Pool' },
    { src: wifi, label: 'Wifi' },
    { src: gym, label: 'Gym' },
    { src: taxi, label: 'Taxi' }
];

export default function HotelInfoAndFacilities() {
    const navigate = useNavigate();

    return (
        <section id='hotelAndFacilities-section'>
            <Box sx={{ position: 'relative', height: 790, backgroundImage: `url(${hotel})`, textAlign: 'center', color: 'white' }}>
                <Box sx={{ position: 'absolute', top: '30%', width: '100%', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                    <Typography variant="h2">WELCOME TO BON HOTEL</Typography>
                    <Typography variant="h5" sx={{ my: 2 }}>Good people. Good thinking. Good feeling.</Typography>
                    <NavigationButton width={{ xs: '50%', md: '25%' }} fontSize={22} height={60} onClick={() => navigate('/')}>
                        EXPLORE
                    </NavigationButton>
                </Box>

                <Box sx={{ position: 'absolute', top: '90%', left: '2%', width: "96%", py: 3, bgcolor: 'white', borderRadius: 2 }}>
                    <HeadingTypography text="Facilities" color="#957554" fontWeight="500" />
                    <Grid container spacing={3} justifyContent="space-evenly">
                        {facilities.map(({ src, label }) => (
                            <Grid item xs={4} lg={2} key={label}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <img src={src} alt={label} width={60} height={60} />
                                    <Typography variant="subtitle1" sx={{ color: '#957554' }}>{label}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </section>
    );
}
