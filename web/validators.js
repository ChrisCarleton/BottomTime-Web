import { addValidationRule } from 'formsy-react';
import moment from 'moment';

addValidationRule('isDateTime', (values, value, format = 'YYYY-MM-DD hh:mmA') => {
	if (!value) {
		return true;
	}

	const date = typeof (value) === 'string'
		? moment(value, format)
		: moment(value);

	return date.isValid();
});

addValidationRule('maxDate', (values, value, params) => {
	if (!value) {
		return true;
	}

	params = params || {};
	params.format = params.format || 'YYYY-MM-DD hh:mmA';

	const date = typeof (value) === 'string'
		? moment(value, params.format, false)
		: moment(value);

	return date.isValid() && date.isSameOrBefore(params.max);
});

addValidationRule('minDate', (values, value, min, params) => {
	if (!value) {
		return true;
	}

	params = params || {};
	params.format = params.format || 'YYYY-MM-DD hh:mmA';

	const date = typeof (value) === 'string'
		? moment(value, params.format, false)
		: moment(value);

	return date.isValid() && date.isSameOrAfter(params.min);
});
