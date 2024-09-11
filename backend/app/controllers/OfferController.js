const Offer = require('../models/Offer');
const database = require('../../database/config');

const createOffer = async (req, res) => {
    const { email, nickname, description, price } = req.body;

    try {
        const newOffer = new Offer({
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
        res.status(200).json(await Offer.find({ jobId }));

    } catch (error) {
        console.error("An error occurred" + error);
    }
}

module.exports = { createOffer, getOffers }