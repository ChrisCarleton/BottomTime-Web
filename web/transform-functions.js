import config from './config';
import CurrentUserStore from './users/stores/current-user-store';
import { FromPreferredUnits } from './unit-conversion';
import moment from 'moment';

export function trim(str) {
	if (typeof str === 'string') {
		return str.trim();
	}

	return str;
}

export function toISOString(str) {
	if (typeof str === 'string') {
		return moment(str, config.entryTimeFormat).utc().toISOString();
	}

	return str;
}

export function toNumber(str) {
	const float = parseFloat(str);
	return isNaN(float) ? null : float;
}

export function toDepth(str) {
	const { distanceUnit } = CurrentUserStore.getState().currentUser;
	const value = parseFloat(str);
	return isNaN(value) ? null : FromPreferredUnits.Distance[distanceUnit](value);
}

export function toPressure(str) {
	const { pressureUnit } = CurrentUserStore.getState().currentUser;
	const value = parseFloat(str);
	return isNaN(value) ? null : FromPreferredUnits.Pressure[pressureUnit](value);
}

export function toTemperature(str) {
	const { temperatureUnit } = CurrentUserStore.getState().currentUser;
	const value = parseFloat(str);
	return isNaN(value) ? null : FromPreferredUnits.Temperature[temperatureUnit](value);
}

export function toWeight(str) {
	const { weightUnit } = CurrentUserStore.getState().currentUser;
	const value = parseFloat(str);
	return isNaN(value) ? null : FromPreferredUnits.Weight[weightUnit](value);
}

export function nullIfEmpty(str) {
	if (str === '') {
		return null;
	}

	return str;
}
