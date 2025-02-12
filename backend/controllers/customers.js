const customersRepositories = require('../repositories/customers');


async function getAllCustomers(req, res) {
    try {
        const customers = await customersRepositories.getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}

async function getCustomerById(req, res) {
    try {
        const id = req.params.id;
        const customer = await customersRepositories.getCustomerById(id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}



async function createCustomer(req, res) {
    const { customerEmail } = req.body;

    if (!customerEmail) {
        return res.status(400).json({ message: "* Please enter an email." });
    }

    try {
        const existingCustomer = await customersRepositories.getCustomerByEmail(customerEmail);

        if (existingCustomer) {
            return res.status(409).json({ message: "You are already subscribed" });
        }

        const savedData = await customersRepositories.createCustomer(customerEmail);

        res.status(201).json({ message: "You are subscribed!", customer: savedData });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}


async function updateCustomer(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
        const customer = await customersRepositories.updateCustomer(id, data);
        const updatedData = await customersRepositories.getCustomerById(id);
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}

async function deleteCustomer(req, res) {
    const id = req.params.id;
    try {
        const result = await customersRepositories.deleteCustomer(id);
        res.status(200).json({ message: 'Successfully deleted' })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, please try again later"});
    }
}



module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}