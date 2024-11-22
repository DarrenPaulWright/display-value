
const isValidIdentifierSimple = /^[$A-Z_a-z][\w$]*$/u;

const isValidKeyString = (value: unknown): boolean => {
	return (typeof value === 'string') &&
		isValidIdentifierSimple.test(value);
};

export default isValidKeyString;
