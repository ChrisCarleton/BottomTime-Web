import Dot from 'dot-object';
import {
	nullIfEmpty,
	toCurrentUserName,
	toNumber,
	trim
} from '../../transform-functions';

const dot = new Dot();
dot.override = true;

const FormMods = {
	'name': trim,
	'location': [ trim, nullIfEmpty ],
	'country': [ trim, nullIfEmpty ],
	'description': [ trim, nullIfEmpty ],
	'gps.lat': [ nullIfEmpty, toNumber ],
	'gps.lon': [ nullIfEmpty, toNumber ]
};

const QueryMods = {
	'accessibility': [ trim, nullIfEmpty ],
	'water': [ trim, nullIfEmpty ],
	'query': [ trim, nullIfEmpty ],
	'minRating': [ nullIfEmpty, toNumber ],
	'maxDifficulty': [ nullIfEmpty, toNumber ],
	'owner': [ toCurrentUserName ],
	'closeTo[0]': [ nullIfEmpty, toNumber ],
	'closeTo[1]': [ nullIfEmpty, toNumber ],
	'distance': [ nullIfEmpty, toNumber ]
};

export default {
	mapFormValues(formData) {
		return dot.object(formData, FormMods);
	},

	mapQueryParameters(queryParams) {
		return dot.object(queryParams, QueryMods);
	},

	postSubmitValidation(model, invalidateForm) {
		if (model.gps) {
			if (!model.gps.lat && model.gps.lon) {
				invalidateForm({
					'gps.lat': 'Latitude is required if longitude is entered.'
				});
				return false;
			}

			if (!model.gps.lon && model.gps.lat) {
				invalidateForm({
					'gps.lon': 'Longitude is required if latitude is entered.'
				});
				return false;
			}

			if (!model.gps.lon && !model.gps.lat) {
				delete model.gps;
			}
		}

		return true;
	}
};
