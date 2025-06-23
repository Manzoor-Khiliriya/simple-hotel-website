const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var cors = require('cors');
const roomsRoutes = require('./routes/rooms');
const bookingsRoutes = require('./routes/bookings');
const customersRoutes = require('./routes/customers');


const app = express();
const PORT = process.env.PORT || 6000;
const DB_CONN_STRING = process.env.Database_URL;

app.use(express.json());
app.use(cors());

mongoose.connect(DB_CONN_STRING);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log('DB connection error : ', error)
});
database.once('connected', () => {
    console.log('DB connected successfully')
});


app.use('/api/rooms', roomsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/customers', customersRoutes);

app.listen(PORT, () => {
    console.log('Server running on Port : ', PORT)
})