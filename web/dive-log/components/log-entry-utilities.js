import Dot from 'dot-object';
import {
	nullIfEmpty,
	toDepth,
	toISOString,
	toNumber,
	toPressure,
	toTemperature,
	toWeight,
	trim
} from '../../transform-functions';
import { ToPreferredUnits } from '../../unit-conversion';

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

const FormMods = {
	'diveNumber': nullIfEmpty,
	'rating': toNumber,
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
	'air[0].in': [ nullIfEmpty, toPressure ],
	'air[0].out': [ nullIfEmpty, toPressure ],
	'air[0].size': [ nullIfEmpty, toNumber ],
	'air[0].workingPressure': [ nullIfEmpty, toNumber ],
	'air[0].material': nullIfEmpty,
	'air[0].oxygen': [ nullIfEmpty, toNumber ],
	'temperature.surface': [ nullIfEmpty, toTemperature ],
	'temperature.water': [ nullIfEmpty, toTemperature ],
	'temperature.thermoclines[0].temperature': [ nullIfEmpty, toTemperature ],
	'temperature.thermoclines[0].depth': [ nullIfEmpty, toNumber ],
	'visibility': toNumber,
	'wind': toNumber,
	'current': toNumber,
	'waterChoppiness': toNumber,
	'weather': [ trim, nullIfEmpty ],
	'suit': [ trim, nullIfEmpty ],
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
