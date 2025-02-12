const Customer = require("../models/customer");


async function getAllCustomers() {
    try {
        const customers = await Customer.find();
        return customers;
    } catch (error) {
        throw new Error('Failed to fetch customers');
    }
}

async function getCustomerById(id) {
    try {
        const customer = await Customer.findById(id);
        return customer;
    } catch (error) {
        throw new Error('Failed to fetch customer');
    }

}

async function getCustomerByEmail(customerEmail) {
    try {
        const customer = await Customer.findOne({customerEmail});
        return customer;
    } catch (error) {
        throw new Error('Failed to fetch customer');
    }

}

async function createCustomer(customerEmail) {
    try {
        const newCustomerData = new Customer({customerEmail});
        const customer = await newCustomerData.save(newCustomerData);
        return customer;
    } catch (error) {
        throw new Error('Failed to create customer');
    }
}

async function updateCustomer(id, data) {
    try {
        const customer = await Customer.findByIdAndUpdate(id, data);
    return customer;
    } catch (error) {
        throw new Error('Failed to update customer');
    }
    
}

async function deleteCustomer(id) {
    try {
        const customer = await Customer.findByIdAndDelete(id);
        return customer;
    } catch (error) {
        throw new Error('Failed to delete customer');
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    getCustomerByEmail,
    createCustomer,
    updateCustomer,
    deleteCustomer
}