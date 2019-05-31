/* eslint no-process-env: 0 */

const config = {
	nodeEnv: process.env.NODE_ENV,
	apiUrl: process.env.BT_API_URL || 'http://localhost:29201/',

	googleMapsApiKey: process.env.BT_GOOGLE_MAPS_API_KEY || '',

	entryTimeFormat: 'YYYY-MM-DD h:mmA',
	passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.]).*$/
};

export default config;
