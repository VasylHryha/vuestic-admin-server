const getDbTypes = require("../db/supabase/types");

const getTypes = async (req, res) => {
	try {
		const result = await getDbTypes(req.query.enum_type);

		res.json(result);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching enum_type: ", error: error.message });
	}
};

module.exports = getTypes;
