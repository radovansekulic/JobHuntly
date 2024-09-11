const Job = require('../models/Job');
const database = require('../../database/config');

const createJob = async (req, res) => {
    const { userId, nickname, title, description, price } = req.body;

    try {
        const newJob = new Job({
            userId: userId,
            nickname: nickname,
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

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).send({ jobs });

    } catch (error) {
        console.error("Error fetching jobs:", error);
    }
};

const myJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.params.id });

        if (jobs.length == 0) {
            return res.status(404).send({ message: "No jobs found for this user" });
        } res.status(200).send({ jobs });

    } catch (error) {
        res.status(500).send({ message: "An error occurred while fetching jobs" });
    }
};

module.exports = { createJob, getJobs, myJobs }