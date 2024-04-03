const ServiceCenter = require('../models/ServiceCenter');

exports.createServiceCenter = async (req, res) => {
    try {
        const { name, address, city, state, zipCode, phone, email, services, openingHours, category, status, images, latitude, longitude } = req.body;

        if (!name || !phone  || !email || !images) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
        await ServiceCenter.create({
            name,
            location: {
                address,
                city,
                state,
                zipCode
            },
            phone,
            email,
            services,
            openingHours,
            category,
            status,
            images
        });

        return res.status(200).json({
			success: true,
			message: "Service Center Created",
		});
    } catch (error) {
		return res.status(500).json({
			success: false,  
			message: error.message,
		});
	}
};


exports.deleteServiceCenter = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedServiceCenter = await ServiceCenter.findByIdAndDelete(id);
        if (!deletedServiceCenter) {
            return res.status(404).json({ message: 'Service center not found' });
        }
        res.json({ message: 'Service center deleted successfully' });
    } catch (error) {
        return res.status(500).json({
			success: true,
			message: error.message,
		});
    }
};

exports.getServiceCenterDetails = async (req, res) => {
    try {
        const { id } = req.body;

        const serviceCenter = await ServiceCenter.findById(id);
        if (!serviceCenter) {
            return res.status(404).json({
                success: false,
                message: 'Service center not found' 
            });
        }
        return res.status(200).json({
			success: true,
			data: "serviceCenter",
		});
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
};
