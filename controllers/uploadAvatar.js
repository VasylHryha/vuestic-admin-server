const avatars = require("../db/supabase/upload");

const uploadAvatar = async (req, res) => {
	try {
		const result = await avatars.upload("avatars", req.body.id, req.file);

		res.send(result);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error uploading avatar: ", error: error.message });
	}
};

module.exports = uploadAvatar;
