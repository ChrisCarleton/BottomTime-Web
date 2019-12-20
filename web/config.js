/* eslint no-process-env: 0 */

const config = {
	nodeEnv: process.env.NODE_ENV,
	webUrl: process.env.BT_WEB_URL || 'http://localhost:8080/',
	adminEmail: process.env.BT_ADMIN_EMAIL || 'admin@bottomtime.ca',

	googleMapsApiKey: process.env.BT_GOOGLE_MAPS_API_KEY || '',

	entryTimeFormat: 'YYYY-MM-DD h:mmA',
	passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.]).*$/
};

export default config;
