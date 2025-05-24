const bookingsRepositories = require('../repositories/bookings');


async function getAllBookings(req, res) {
    try {
        const bookings = await bookingsRepositories.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});;
    }
}

async function getBookingById(req, res) {
    try {
        const id = req.params.id;
        const booking = await bookingsRepositories.getBookingById(id);
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});;
    }
}



async function createBooking(req, res) {
    const { customerName, customerEmail,customerContactNumber, cityName, roomType, checkInDate, checkOutDate } = req.body;

    const bookingData = {
        bookingdate: new Date,
        customerName,
        customerEmail,
        customerContactNumber: `+91 ${customerContactNumber}`,
        cityName,
        roomType,
        checkInDate,
        checkOutDate
    };

    try {
        const savedData = await bookingsRepositories.createBooking(bookingData);
        res.status(201).json({ message: 'Booked successfully' , data: savedData });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});;
    }
}

async function updateBooking(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
        const booking = await bookingsRepositories.updateBooking(id, data);
        const updatedData = await bookingsRepositories.getBookingById(id);
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}

async function deleteBooking(req, res) {
    const id = req.params.id;
    try {
        const result = await bookingsRepositories.deleteBooking(id);
        res.status(200).json({ message: 'Successfully deleted' })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}

module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
}