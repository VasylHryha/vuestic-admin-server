const avatars = require("../db/supabase/files");

const upload = async (req, res) => {
	try {
		const result = await avatars.upload("avatars", req.body.id, req.file);

		res.send(result);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error uploading avatar: ", error: error.message });
	}
};

const remove = async (req, res) => {
	try {
		const result = await avatars.remove("avatars", req.params.id);

		res.send(result);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error uploading avatar: ", error: error.message });
	}
};

module.exports = {
	upload,
	remove,
};
