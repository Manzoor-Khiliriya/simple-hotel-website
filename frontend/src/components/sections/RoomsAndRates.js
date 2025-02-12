import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import room1 from '../../assets/images/FqqiAvJejto.png';
import room2 from '../../assets/images/room2.png';
import HeadingTypography from '../customHeading/HeadingTypography.js.js';
import NavigationButton from '../customButtons/NavigationButton.js';

const rooms = [
    { label: "Standard Twin Room", image: room1, type: "standard-twin" },
    { label: "Standard Room", image: room2, type: "standard" },
    { label: "Standard View Room", image: room1, type: "standard-view" },
    { label: "Deluxe Room", image: room2, type: "deluxe" }
];

export default function RoomsAndRates() {
    const navigate = useNavigate();

    return (
        <section id="rooms-section" style={{ padding: 30, marginTop: 120 }}>
            <HeadingTypography text="Rooms & Rates" color="#957554" fontWeight="500" />
            <Grid container spacing={4} justifyContent="center">
                {rooms.map((room, index) => (
                    <Grid size={{xs:12 ,sm:6}} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={room.label}
                                height="250"
                                image={room.image}
                                title={room.label}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography variant="h6" color="textPrimary" gutterBottom>
                                    {room.label}
                                </Typography>
                                <NavigationButton padding='20px' onClick={() => navigate(`/rooms-type?roomType=${room.type}`)}>
                                    Check Rates
                                </NavigationButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </section>
    );
}
