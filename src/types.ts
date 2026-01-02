export interface IInternalSettings {
	beautify: boolean;
	keyQuote: string;
	stringQuote: string;
	space: string;
	separator: string;
	maxCharsPerLine: number;
	sortKeys: boolean;
}

export type StringifyAny = (
	value: unknown,
	indent: number,
	settings: IInternalSettings,
	isKey?: boolean
) => string;
