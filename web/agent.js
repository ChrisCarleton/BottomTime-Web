import request from 'superagent';

const TokenKey = 'bt_token';
function formatAuthHeader(token) {
	return typeof (token) === 'string' ? [ 'Authorization', `Bearer ${ token }` ] : null;
}

class AuhtorizedRequest {
	constructor() {
		this.authHeader = formatAuthHeader(localStorage.getItem(TokenKey));
		this.agent = request.agent();
	}

	setAuthToken(token) {
		localStorage.setItem(TokenKey, token);
		this.authHeader = formatAuthHeader(token);
	}

	clearAuthToken() {
		localStorage.removeItem(TokenKey);
		this.authHeader = null;
	}

	get(route) {
		return this.authHeader
			? this.agent.get(route).set(...this.authHeader)
			: this.agent.get(route);
	}

	post(route) {
		return this.authHeader
			? this.agent.post(route).set(...this.authHeader)
			: this.agent.post(route);
	}

	put(route) {
		return this.authHeader
			? this.agent.put(route).set(...this.authHeader)
			: this.agent.put(route);
	}

	patch(route) {
		return this.authHeader
			? this.agent.patch(route).set(...this.authHeader)
			: this.agent.patch(route);
	}

	del(route) {
		return this.authHeader
			? this.agent.del(route).set(...this.authHeader)
			: this.agent.del(route);
	}
}

export default new AuhtorizedRequest();
