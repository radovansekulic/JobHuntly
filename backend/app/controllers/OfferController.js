const Offer = require('../models/Offer');
const Job = require('../models/Job');
const database = require('../../database/config');

const createOffer = async (req, res) => {
    const { userId, email, nickname, description, price } = req.body;

    try {
        const newOffer = new Offer({
            userId: userId,
            jobId: req.params.id,
            email: email,
            nickname: nickname,
            description: description,
            price: price
        });

        await newOffer.save();
        res.status(201).send({ message: 'Offer created successfully' });

    } catch (error) {
        res.status(500).send({ error: 'Failed to create offer' });
    }
}

const getOffers = async (req, res) => {
    try {
        const jobId = req.params.id;
        const offers = await Offer.find({ jobId }).sort({ createdAt: -1 });
        res.status(200).json(offers);

    } catch (error) {
        console.error("An error occurred" + error);
    }
}

const getJobs = async (req, res) => {
    try {
        const userId = req.params.id;
        const offers = await Offer.find({ userId });
        const jobIds = offers.map(offer => offer.jobId);
        const jobs = await Job.find({ _id: { $in: jobIds } });
        res.status(200).json({ jobs, offers });

    } catch (error) {
        console.error("An error occurred: ", error);
        res.status(500).json({ message: "An error occurred" });
    }
}

module.exports = { createOffer, getOffers, getJobs }