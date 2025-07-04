const express = require('express');
const router = express.Router();
const { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/bookings');


router.get('/', getAllBookings);
router.get('/:id', getBookingById)
router.post('/', createBooking);
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)


module.exports = router;