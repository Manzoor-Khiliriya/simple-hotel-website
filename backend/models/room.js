const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        require : true
    },
    cityName: {
        type: String,
        require : true
    },
    rate: {
        type: Number,
        require : true
    },
    features: {
        type: [String],
        require: true
    },
    availabilityPeriods: [{
        startDate: { type: Date, require: true },
        endDate: { type: Date, require: true }
    }]
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
