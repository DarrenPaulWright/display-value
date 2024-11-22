import type { IInternalSettings } from './types.js';

const stringifyString = (
	value: string,
	isKey: boolean,
	settings: IInternalSettings
): string => {
	const quote = isKey ? settings.keyQuote : settings.stringQuote;

	return `${
		quote
	}${
		value.replaceAll(settings.stringQuote, `\\${ settings.stringQuote }`)

	}${
		quote
	}`;
};

export default stringifyString;
