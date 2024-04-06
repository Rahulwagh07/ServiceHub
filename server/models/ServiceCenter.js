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
    // location: {
    //     address: String,
    //     city: String,
    //     state: String,
    //     zipCode: String
    // },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    services: [{
        type: String
    }],
    openingHours: {
        type: String
    },
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview"
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    status: {
        type: String,
        enum: ["Draft", "Published"]
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
