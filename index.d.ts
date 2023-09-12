export default function displayValue(value: unknown, settings?: {
	/** If true and value is an Array or Object then the output is rendered in multiple lines with indentation. */
	beautify?: boolean;
	/** If true then keys and strings are wrapped in double quotes, similar to JSON.stringify. */
	preferJson?: boolean;
	/** If true then strings will be wrapped in single quotes. Only applicable if preferJson is false. */
	preferSingleQuote?: boolean;
}): string;
