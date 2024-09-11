const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    nickname: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;