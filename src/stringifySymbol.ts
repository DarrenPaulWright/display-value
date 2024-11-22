const stringifySymbol = (value: symbol): string => {
	if (value.description !== undefined) {
		return `Symbol(${ value.description })`;
	}

	return value.toString();
};

export default stringifySymbol;
