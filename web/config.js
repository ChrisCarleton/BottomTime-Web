/* eslint no-process-env: 0 */

const config = {
	nodeEnv: process.env.NODE_ENV,
	apiUrl: process.env.BT_API_URL || 'http://localhost:29201/'
};

export default config;
