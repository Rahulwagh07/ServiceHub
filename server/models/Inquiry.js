const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceCenter: { type: Schema.Types.ObjectId, ref: 'ServiceCenter', required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
