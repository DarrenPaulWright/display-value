const isArray = Array.isArray;
const slice = Array.prototype.slice;
const stringify = JSON.stringify;
const isNative = (value) => (value.constructor + '').includes('[native code]');

/**
 *  Designed for use in test messages, displayValue takes a javascript value and returns a human readable string representation of that value.
 *
 * Notes:
 * - finite numbers are passed through number.toLocaleString()
 *   - -0 is rendered as -0
 *   - 1300 is rendered as 1,300 (depending on locale)
 * - strings are wrapped in single quotes
 * - Arrays and Objects are passed through JSON.stringify
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
 * displayValue(-0);
 * // => "-0"
 *
 * displayValue('foo');
 * // => "'foo'"
 *
 * displayValue({x: 1});
 * // => "{"x": 1}"
 *
 * displayValue({x: 1}, {beautify: true});
 * // => "{
 * //         "x": 1
 * //     }"
 * ```
 *
 * @function displayValue
 *
 * @arg {*} value
 * @arg {Object} [settings]
 * @arg {Boolean} [settings.beautify=false] - If true and value is an Array or Object then the output is rendered in multiple lines with indentation
 *
 * @returns {string}
 */
const displayValue = (value, settings = {}) => {
	if (Object.is(value, -0)) {
		return '-0';
	}

	const type = typeof value;

	if (value instanceof String || type === 'string') {
		return '\'' + value + '\'';
	}

	if (type === 'symbol') {
		if (value.description !== undefined) {
			return 'Symbol(' + value.description + ')';
		}

		return value.toString();
	}

	if (type === 'number' && isFinite(value)) {
		return value.toLocaleString();
	}

	if (value && (isArray(value) || value.constructor === Object || (value.toJSON && !(value instanceof Date)))) {
		if (typeof value.length === 'number') {
			value = slice.call(value);
		}

		if (settings.beautify) {
			return stringify(value, null, 4);
		}

		return stringify(value);
	}

	if (value) {
		if (value.name) {
			return value.name;
		}

		if (value.constructor && !isNative(value)) {
			if (value.toString) {
				const string = value.toString();

				if (string !== '[object Object]') {
					return string;
				}
			}

			return '[object ' + value.constructor.name + ']';
		}
	}

	return value + '';
};

module.exports = displayValue;
