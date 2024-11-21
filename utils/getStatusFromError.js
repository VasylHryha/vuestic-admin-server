function getStatusFromError(error) {
	const code = error.code?.toString();

	return code && (code.startsWith("22") || code.startsWith("23")) ? 400 : 500;
}

module.exports = getStatusFromError;
