import formatObject from './formatObject.js';
import isObject from './isObject.js';
import type { IInternalSettings, StringifyAny } from './types.js';

const stringifyArray = (
	values: Array<unknown>,
	prefix: string,
	indent: number,
	settings: IInternalSettings,
	stringifyAny: StringifyAny
): string => {
	const isAllObjects = values.every((value) => isObject(value));
	const mapIndent = isAllObjects ? indent : indent + 1;

	return formatObject(
		values.map((value) => stringifyAny(value, mapIndent, settings)),
		prefix,
		indent,
		{
			head: '[',
			foot: ']',
			pad: false,
			compact: isAllObjects
		},
		settings
	);
};

export default stringifyArray;
