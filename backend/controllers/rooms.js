const roomsRepositories = require('../repositories/rooms');


async function getAllRooms(req, res) {
    try {
        const rooms = await roomsRepositories.getAllRooms();
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});;
    }
}

async function getRoomById(req, res) {
    try {
        const id = req.params.id;
        const room = await roomsRepositories.getRoomById(id);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json({ success: true, data: room });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});;
    }
}

async function getRoomsByType(req, res) {
    try {
        const { roomType } = req.query;
        const rooms = await roomsRepositories.getRoomsByType(roomType);
        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: "No rooms found" });
        }
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});;
    }
}

async function getAvailableRooms(req, res) {
    try {
        const { cityName, checkInDate, checkOutDate } = req.body;

        if (!cityName || !checkInDate || !checkOutDate) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (isNaN(checkIn) || isNaN(checkOut)) {
            return res.status(400).json({
                message: "Invalid date format. Please provide valid dates.",
            });
        }

        if (checkIn >= checkOut) {
            return res.status(400).json({
                message: "Check-out date must be after check-in date.",
            });
        }

        const availabilityPeriods = {
            $elemMatch: {
                startDate: { $lte: checkIn },
                endDate: { $gte: checkOut },
            },
        };

        const formData = {
            cityName: cityName,
            availabilityPeriods: availabilityPeriods
        };

        const availableRooms = await roomsRepositories.getAvailableRooms(formData);

        if (!availableRooms || availableRooms.length === 0) {
            return res.status(404).json({
                message: `No rooms available in ${cityName} from ${checkInDate} to ${checkOutDate}.`
            });
        }

        res.status(200).json({
            success: true,
            data: availableRooms,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error. Please try again later.",
        });
    }
}


async function createRoom(req, res) {
    const { roomType, cityName, rate, features, availabilityPeriods } = req.body;

    const periods = availabilityPeriods.map(period => ({
        startDate: new Date(period.startDate),
        endDate: new Date(period.endDate)
    }));

    const roomData = {
        roomType, 
        cityName,
        rate,
        features,
        availabilityPeriods: periods
    };

    try {
        const savedData = await roomsRepositories.createRoom(roomData);
        res.status(201).json({ success: true, data: savedData });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later" });
    }
}



async function updateRoom(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
        const room = await roomsRepositories.updateRoom(id, data);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        const updatedData = await roomsRepositories.getRoomById(id);
        res.status(200).json({ success: true, data: updatedData })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}

async function deleteRoom(req, res) {
    const id = req.params.id;
    try {
        const result = await roomsRepositories.deleteRoom(id);
        res.status(200).json({ success: true, message: 'Successfully deleted' })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}


module.exports = {
    getAllRooms,
    getRoomById,
    getRoomsByType,
    getAvailableRooms,
    createRoom,
    updateRoom,
    deleteRoom
}