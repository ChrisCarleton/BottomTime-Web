import config from './config';
import request from 'superagent';
import url from 'url';

export default request.agent();

export function makeAbsoluteUri(relative) {
	return url.resolve(config.apiUrl, relative);
}
