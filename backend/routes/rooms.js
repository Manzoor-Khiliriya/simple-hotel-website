const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom, getAvailableRooms, getRoomsByType } = require('../controllers/rooms');


router.get('/', getAllRooms);
router.get('/type', getRoomsByType);
router.get('/:id', getRoomById);
router.post('/', createRoom);
router.post('/available-rooms', getAvailableRooms);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);


module.exports = router;