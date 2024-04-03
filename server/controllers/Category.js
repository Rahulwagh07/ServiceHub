const Category = require("../models/Category");
 
exports.createCategory = async (req, res) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		await Category.create({
			name: name,
		});
		return res.status(200).json({
			success: true,
			message: "Category created",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find({});
		return res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "serviceCenter",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
       if (!selectedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      if (selectedCategory.courses.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No ServiceCenter listed for the selected category.",
        })
      }
   
       return res.status(200).json({
            success: true,
            data:selectedCategory,
       });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  };