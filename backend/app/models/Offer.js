const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    jobId: { type: String, require: true },
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;