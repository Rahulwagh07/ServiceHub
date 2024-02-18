const mongoose = require('mongoose');
 
const serviceCenterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        address: String,
        city: String,
        state: String,
        zipCode: String
    },
    contact: {
        phone: String,
        email: String
    },
    services: [{ type: String }],
    openingHours: {
        type: String
    },
    images: [{ type: String }], // Array of image URLs
}, { timestamps: true });

const ServiceCenter = mongoose.model('ServiceCenter', serviceCenterSchema);

module.exports = ServiceCenter;
