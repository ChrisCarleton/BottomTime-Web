import { ToPreferredUnits } from '../../unit-conversion';

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
	}

};

export default leUtilities;
