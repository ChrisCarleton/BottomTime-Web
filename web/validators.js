import { addValidationRule } from 'formsy-react';
import moment from 'moment';

const DATE_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'hh:mmA';

addValidationRule(
	'isDateTime',
	(values, value) => moment(value, `${ DATE_FORMAT } ${ TIME_FORMAT }`).isValid()
);
