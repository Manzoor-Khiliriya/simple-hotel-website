const Room = require("../models/room");


async function getAllRooms() {
    try {
        const rooms = await Room.find();
        return rooms;
    } catch (error) {
        throw new Error('Failed to fetch rooms details');
    }
}

async function getRoomById(id) {
    try {
        const room = await Room.findById(id);
        return room;
    } catch (error) {
        throw new Error('Failed to fetch room details');
    }

}

async function getRoomsByType(roomType) {
    try {
        const rooms = await Room.find({roomType});
        return rooms;
    } catch (error) {
        throw new Error('Failed to fetch room details');
    }

}

async function createRoom(roomData) {
    try {
        const newRoomData = new Room(roomData);
        const room = await newRoomData.save();
        return room;
    } catch (error) {
        throw new Error('Failed to create room');
    }
}

async function updateRoom(id, data) {
    try {
        const room = await Room.findByIdAndUpdate(id, data);
        return room;
    } catch (error) {
        throw new Error('Failed to update room details');
    }
}

async function deleteRoom(id) {
    try {
        const room = await Room.findByIdAndDelete(id);
        return room;
    } catch (error) {
        throw new Error('Failed to delete room');
    }
}

async function getAvailableRooms(formData) {
    try {
        const rooms = await Room.find(formData);
        return rooms;
    } catch (error) {
        throw new Error('Error querying available rooms');
    }
};


module.exports = {
    getAllRooms,
    getRoomById,
    getRoomsByType,
    createRoom,
    updateRoom,
    deleteRoom,
    getAvailableRooms,
}