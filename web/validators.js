/* eslint no-control-regex: 0 */
/* eslint no-useless-escape: 0 */
/* eslint max-len: 0 */
import { addValidationRule } from 'formsy-react';
import moment from 'moment';

// Email regex was borrowed from the Formsy-React source code.
const EmailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
const UsernameRegex = /^[a-z0-9_.-]+$/i;

addValidationRule('isDateTime', (values, value, format = 'YYYY-MM-DD hh:mmA') => {
	if (!value) {
		return true;
	}

	const date = typeof (value) === 'string'
		? moment(value, format)
		: moment(value);

	return date.isValid();
});

addValidationRule('isGreaterThan', (values, value, min) => {
	if (typeof value === 'string' && value.length > 0) {
		const parsed = parseFloat(value);
		return isNaN(parsed) ? false : parsed > min;
	}

	return true;
});

addValidationRule('isGreaterThanOrEqual', (values, value, min) => {
	if (typeof value === 'string' && value.length > 0) {
		const parsed = parseFloat(value);
		return isNaN(parsed) ? false : parsed >= min;
	}

	return true;
});

addValidationRule('isLessThan', (values, value, min) => {
	if (typeof value === 'string' && value.length > 0) {
		const parsed = parseFloat(value);
		return isNaN(parsed) ? false : parsed < min;
	}

	return true;
});

addValidationRule('isLessThanOrEqual', (values, value, min) => {
	if (typeof value === 'string' && value.length > 0) {
		const parsed = parseFloat(value);
		return isNaN(parsed) ? false : parsed <= min;
	}

	return true;
});

addValidationRule('isGreaterThanOrEqualToField', (values, value, field) => {
	if (!values[field] || values[field].length === 0) {
		return true;
	}

	const otherField = parseFloat(values[field]);
	if (isNaN(otherField)) {
		return true;
	}

	if (value && value.length > 0) {
		const parsed = parseFloat(value);
		return isNaN(parsed) ? false : parsed >= otherField;
	}

	return true;
});

addValidationRule('isBetween', (values, value, { min, max }) => {
	if (typeof value === 'string' && value.length > 0) {
		const parsed = parseFloat(value);
		return isNaN(parsed) ? false : min <= parsed && parsed <= max;
	}

	return true;
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

addValidationRule('isUsernameOrEmail', (values, value) => {
	if (!value) {
		return true;
	}

	return UsernameRegex.test(value) || EmailRegex.test(value);
});
