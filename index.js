const isArray = Array.isArray;
const isObject = (value) => value.constructor === Object;
const slice = Array.prototype.slice;
const stringify = JSON.stringify;
const isNative = (value) => (value + '').includes('[native code]');

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
	if (value === null || value === undefined || value !== value) {
		return value + '';
	}

	const type = typeof value;

	if (type === 'string' || value instanceof String) {
		return '\'' + value + '\'';
	}

	if (type === 'number' && isFinite(value)) {
		if (Object.is(value, -0)) {
			return '-0';
		}

		return value.toLocaleString();
	}

	if (type === 'symbol') {
		if (value.description !== undefined) {
			return 'Symbol(' + value.description + ')';
		}

		return value.toString();
	}

	if (isArray(value) || isObject(value) || (value.toJSON && !(value instanceof Date))) {
		if (value.length !== undefined) {
			value = slice.call(value);
		}

		return stringify(value, null, settings.beautify ? 4 : null);
	}

	if (value.name) {
		return value.name;
	}

	if (value.constructor !== undefined && !isNative(value.constructor)) {
		if (value.toString) {
			const string = value.toString();

			if (string !== '[object Object]') {
				return string;
			}
		}

		return '[object ' + value.constructor.name + ']';
	}

	return value + '';
};

module.exports = displayValue;
