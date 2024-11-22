import stringifyAny from './src/stringifyAny.js';

interface ISettings {

	/**
	 * Render Arrays or Objects on multiple lines with indentation.
	 * @default false
	 */
	beautify?: boolean;

	/**
	 * Wrap keys and strings in double quotes, similar to JSON.stringify.
	 * @default true
	 */
	preferJson?: boolean;

	/**
	 * Wrap strings in single quotes. Only applicable if preferJson is false.
	 * @default false
	 */
	preferSingleQuote?: boolean;
}

/**
 *  Designed for use in test messages, displayValue takes a javascript value and returns a human-readable string representation of that value.
 *
 * Notes:
 * - finite numbers are passed through number.toLocaleString()
 *   - -0 is rendered as -0
 *   - 1300 is rendered as 1,300 (depending on locale)
 * - strings are wrapped in double quotes
 * - Arrays and Objects are passed through a function similar to JSON.stringify, but values are individually run through displayValue
 * - Array-like values such as arguments are handled like Arrays
 * - Object-like values such as ClientRect and DOMRect are handled like Objects
 * - Constructors will return the constructor's name
 * - Instances of non-native constructors:
 *   - will return the result of .toString() if other than '[object Object]'
 *   - otherwise returns '[object Name]' where Name is the constructor's name
 *
 * @example
 *
 * ``` javascript
 * import displayValue from 'display-value';
 *
 * displayValue(-0); // '-0'
 * displayValue(1300000); // '1,300,000'
 * displayValue('foo'); // '"foo"'
 * displayValue({x: 1}); // '{"x": 1}'
 *
 * displayValue(() => {}); // '() => {…}'
 * displayValue(function(param) {}); // 'ƒ (param) {…}'
 * displayValue(function name() {}); // 'ƒ name() {…}'
 *
 * displayValue(Symbol()); // 'Symbol()'
 * displayValue(Symbol('name')); // 'Symbol(name)'
 *
 * displayValue(new CustomClass()); // '[object CustomClass]'
 *
 * displayValue([{x: 1}, {x: 2000}], {beautify: true});
 * // '[
 * //     {
 * //         "x": 1
 * //     }, {
 * //         "x": 2,000
 * //     }
 * // ]'
 * ```
 *
 * @function displayValue
 *
 * @param {*} value
 * @param {object} [settings]
 * @param {boolean} [settings.beautify=false] - If true and value is an Array or Object then the output is rendered in multiple lines with indentation
 * @param {boolean} [settings.preferJson=true] - If true then keys and strings are wrapped in double quotes, similar to JSON.stringify.
 * @param {boolean} [settings.preferSingleQuote=false] - If true then strings will be wrapped in single quotes. Only applicable if preferJson is false.
 *
 * @returns {string}
 */
const displayValue = (value: unknown, settings: ISettings = {}): string => {
	return stringifyAny(value, 0, {
		beautify: settings.beautify === true,
		keyQuote: settings.preferJson === false ? '' : '"',
		stringQuote: (settings.preferJson === false && settings.preferSingleQuote === true) ? '\'' : '"',
		space: settings.beautify ? ' ' : '',
		separator: settings.beautify ? ',' : ', '
	});
};

export default displayValue;
