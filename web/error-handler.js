export default function (response) {
	if (response.status === 401 && !response.body.errorId) {
		// Auth token is expired or invalid. Remove it and send the user to the login page.
	}
}
