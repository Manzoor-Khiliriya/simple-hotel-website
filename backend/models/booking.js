const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingDate: {
        type: Date,
        require : true 
    },
    customerName: {
        type: String,
        require : true
    },
    customerEmail: {
        type: String,
        require : true
    },
    customerContactNumber: {
        type: String,
        require : true
    },
    roomType: {
        type: String,
        require : true
    },
    cityName: {
        type: String,
        require : true
    },
    checkInDate: {
        type: Date,
        require : true
    },
    checkOutDate: {
        type: Date,
        require : true
    }
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
