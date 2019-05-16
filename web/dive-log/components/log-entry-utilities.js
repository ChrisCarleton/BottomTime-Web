import config from '../../config';
import CurrentUserStore from '../../users/stores/current-user-store';
import Dot from 'dot-object';
import { FromPreferredUnits, ToPreferredUnits } from '../../unit-conversion';
import moment from 'moment';

const dot = new Dot();
dot.override = true;

function validateGPS(model, invalidateForm) {
	if (model.gps) {
		if (!model.gps.latitude && model.gps.longitude) {
			invalidateForm({
				'gps.latitude': 'Latitude is required if longitude is entered.'
			});
			return false;
		}

		if (!model.gps.longitude && model.gps.latitude) {
			invalidateForm({
				'gps.longitude': 'Longitude is required if latitude is entered.'
			});
			return false;
		}

		if (!model.gps.longitude && !model.gps.latitude) {
			delete model.gps;
		}
	}

	return true;
}

function validateTankVolume(model, invalidateForm) {
	if (model.air) {
		if (!model.air.volume && model.air.volumeUnit) {
			invalidateForm({
				'air.volume': 'Tank volume is required if volume unit is selected.'
			});
			return false;
		}

		if (model.air.volume && !model.air.volumeUnit) {
			invalidateForm({
				'air.volumeUnit': 'Tank volume unit is required if volume is entered.'
			});
			return false;
		}
	}

	return true;
}

function trim(str) {
	if (typeof str === 'string') {
		return str.trim();
	}

	return str;
}

function toISOString(str) {
	if (typeof str === 'string') {
		return moment(str, config.entryTimeFormat).utc().toISOString();
	}

	return str;
}

function toNumber(str) {
	const float = parseFloat(str);
	return isNaN(float) ? null : float;
}

function toDepth(str) {
	const { distanceUnit } = CurrentUserStore.getState().currentUser;
	const value = parseFloat(str);
	return isNaN(value) ? null : FromPreferredUnits.Distance[distanceUnit](value);
}

function toPressure(str) {
	const { pressureUnit } = CurrentUserStore.getState().currentUser;
	const value = parseFloat(str);
	return isNaN(value) ? null : FromPreferredUnits.Pressure[pressureUnit](value);
}

function toTemperature(str) {
	const { temperatureUnit } = CurrentUserStore.getState().currentUser;
	const value = parseFloat(str);
	return isNaN(value) ? null : FromPreferredUnits.Temperature[temperatureUnit](value);
}

function toWeight(str) {
	const { weightUnit } = CurrentUserStore.getState().currentUser;
	const value = parseFloat(str);
	return isNaN(value) ? null : FromPreferredUnits.Weight[weightUnit](value);
}

function nullIfEmpty(str) {
	if (str === '') {
		return null;
	}

	return str;
}

const FormMods = {
	'diveNumber': nullIfEmpty,
	'location': trim,
	'site': trim,
	'entryTime': toISOString,
	'bottomTime': toNumber,
	'totalTime': toNumber,
	'surfaceInterval': toNumber,
	'averageDepth': toDepth,
	'maxDepth': toDepth,
	'gps.latitude': toNumber,
	'gps.longitude': toNumber,
	'weight.belt': toWeight,
	'weight.integrated': toWeight,
	'weight.backplate': toWeight,
	'weight.ankles': toWeight,
	'weight.other': toWeight,
	'weight.correctness': nullIfEmpty,
	'weight.trim': nullIfEmpty,
	'decoStops[0].depth': toDepth,
	'decoStops[0].duration': toNumber,
	'air[0].in': toPressure,
	'air[0].out': toPressure,
	'air[0].size': toNumber,
	'air[0].workingPressure': toPressure,
	'air[0].material': nullIfEmpty,
	'air[0].oxygen': toNumber,
	'temperature.surface': [ nullIfEmpty, toTemperature ],
	'temperature.water': [ nullIfEmpty, toTemperature ],
	'temperature.thermoclines[0].temperature': [ nullIfEmpty, toTemperature ],
	'temperature.thermoclines[0].depth': [ nullIfEmpty, toNumber ],
	'comments': [ trim, nullIfEmpty ]
};

const leUtilities = {
	renderDepth(value, unit) {
		return value || value === 0
			? ToPreferredUnits.Distance[unit](value).toFixed(2)
			: '';
	},

	renderTemperature(value, unit) {
		return value || value === 0
			? ToPreferredUnits.Temperature[unit](value).toFixed(2)
			: '';
	},

	renderPressure(value, unit) {
		return value || value === 0
			? ToPreferredUnits.Pressure[unit](value).toFixed(2)
			: '';
	},

	renderWeight(value, unit) {
		return value || value === 0
			? ToPreferredUnits.Weight[unit](value).toFixed(2)
			: '';
	},

	mapFormValues(formData) {
		return dot.object(formData, FormMods);
	},

	postValidate(model, invalidateForm) {
		if (
			model.temperature
			&& model.temperature.thermoclines
			&& model.temperature.thermoclines[0]
			&& !model.temperature.thermoclines[0].temperature
		) {
			delete model.temperature.thermoclines;
		}

		return validateGPS(model, invalidateForm) && validateTankVolume(model, invalidateForm);
	}
};

export default leUtilities;
