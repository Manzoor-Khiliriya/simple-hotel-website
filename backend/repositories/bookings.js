const Booking = require("../models/booking");


async function getAllBookings() {
    try {
        const bookings = await Booking.find();
        return bookings;
    } catch (error) {
        throw new Error('Failed to fetch bookings');
    }
}

async function getBookingById(id) {
    try {
        const booking = await Booking.findById(id);
        return booking;
    } catch (error) {
        throw new Error('Failed to fetch booking');
    }

}

async function createBooking(bookingData) {
    try {
        const newBookingData = new Booking(bookingData);
        const booking = await newBookingData.save();
        return booking;
    } catch (error) {
        throw new Error('Failed to create booking');
    }
}

async function updateBooking(id, data) {
    try {
        const booking = await Booking.findByIdAndUpdate(id, data);
        return booking;
    } catch (error) {
        throw new Error('Failed to update booking');
    }

}

async function deleteBooking(id) {
    try {
        const booking = await Booking.findByIdAndDelete(id);
        return booking;
    } catch (error) {
        throw new Error('Failed to delete booking');
    }


}

module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}