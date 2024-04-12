const mongoose = require('mongoose');

const serviceCenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    services: {
        type: [String],  
        default: []  
    },
    openingHours: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    status: {
        type: String,
        enum: ["draft", "published"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type : String,
    }
}, { timestamps: true });

const ServiceCenter = mongoose.model('ServiceCenter', serviceCenterSchema);

module.exports = ServiceCenter;
