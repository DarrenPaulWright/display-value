/**
 *  Designed for use in test messages, displayValue takes a javascript value and returns a human readable string representation of that value.
 *
 * Notes:
 * - -0 is rendered as -0
 * - strings are wrapped in single quotes
 * -  Arrays and Objects are passed through JSON.stringify
 * - Array-like values such as arguments are handled like Arrays
 * - Object-like values such as ClientRect and DOMRect are handled like Objects
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
 *            "x": 1
 *        }"
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
	if (value instanceof String || typeof value === 'string') {
		return '\'' + value + '\'';
	}
	if (value && (Array.isArray(value) || value.constructor === Object || (value.toJSON && !(value instanceof Date)))) {
		if (typeof value.length === 'number') {
			value = Array.prototype.slice.call(value);
		}
		if (settings.beautify) {
			return JSON.stringify(value, null, 4);
		}
		return JSON.stringify(value);
	}

	return value + '';
};

module.exports = displayValue;
