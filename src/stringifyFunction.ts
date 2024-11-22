import { HIDDEN_CONTENT } from './constants.js';
import isNativeCode from './isNativeCode.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const stringifyFunction = (value: Function): string => {
	const string = `${ value }`;

	if (value?.name !== '' && isNativeCode(string)) {
		return value.name;
	}

	return string
		.slice(0, string.indexOf('{'))
		.replace('function', 'ƒ')
		.replace('ƒ(', 'ƒ (') + HIDDEN_CONTENT;
};

export default stringifyFunction;
