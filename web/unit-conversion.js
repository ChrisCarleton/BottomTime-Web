export const ToPreferredUnits = {
	Distance: {
		m: d => d,
		ft: d => 3.28084 * d
	},
	Temperature: {
		c: t => t,
		f: t => (9 / 5) * t + 32
	},
	Weight: {
		kg: w => w,
		lbs: w => 2.20462 * w
	}
};

export const FromPreferredUnits = {
	Distance: {
		m: d => d,
		ft: d => 0.3048 * d
	},
	Temperature: {
		c: t => t,
		f: t => (t - 32) * (5 / 9)
	},
	Weight: {
		kg: w => w,
		lbs: w => 0.453592 * w
	}
};
