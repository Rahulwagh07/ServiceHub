const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    serviceCenters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceCenter"
    }]
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
