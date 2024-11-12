const supabase = require("./setup");

const getTypes = async (enum_type) => {
	const { data, error } = await supabase.rpc('get_types', { enum_type  })

	if (!error) return data;

	throw error;
}

module.exports = getTypes;
