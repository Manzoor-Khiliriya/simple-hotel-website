const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerEmail: {
        type: String,
        unique: true,
        require: true
    }
})

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;