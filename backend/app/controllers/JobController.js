const Job = require('../models/Job');
const database = require('../../database/config');

const createJob = async (req, res) => {
    const { userId, title, description, price } = req.body;

    try {
        const newJob = new Job({
            userId: userId,
            title: title,
            description: description,
            price: price
        });

        await newJob.save();
        res.status(200).send({ message: 'Job created successfully' });

    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = { createJob }