// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
const stringifyBigInt = (value: bigint | BigInt): string => {
	if (Object.is(value, -0n)) {
		return '-0n';
	}

	return `${ Number(value)
		.toLocaleString('default', {
			maximumFractionDigits: 20
		}) }n`;
};

export default stringifyBigInt;
