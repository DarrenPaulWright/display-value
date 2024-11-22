import formatObject from './formatObject.js';
import isValidKeyString from './isValidKeyString.js';
import type { IInternalSettings, StringifyAny } from './types.js';

const stringifyObject = (
	value: Array<[unknown, unknown]>,
	prefix: string,
	indent: number,
	settings: IInternalSettings,
	stringifyAny: StringifyAny
): string => {
	return formatObject(
		value.map(([key, subValue]): string => {
			const keySettings = typeof key === 'string' ?
				(isValidKeyString(key) ?
					settings :
					{ ...settings, keyQuote: settings.stringQuote }) :
				{ ...settings, keyQuote: '' };

			return `${
				stringifyAny(key, indent + 1, keySettings, true)
			}: ${
				stringifyAny(subValue, indent + 1, settings)
			}`;
		}),
		prefix,
		indent,
		{
			head: '{',
			foot: '}',
			pad: true,
			compact: false
		},
		settings
	);
};

export default stringifyObject;
