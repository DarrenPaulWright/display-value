import isObject from './isObject.js';

const isArguments = (value: unknown): value is IArguments => {
	return isObject(value) &&
		('callee' in value && 'length' in value);
};

export default isArguments;
