const stringifyNumber = (value: number): string => {
	if (!isFinite(value)) {
		return `${ value }`;
	}

	if (Object.is(value, -0)) {
		return '-0';
	}

	return value.toLocaleString('default', {
		maximumFractionDigits: 20
	});
};

export default stringifyNumber;
