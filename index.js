/**
 * Takes any javascript value and returns a human readable string representation of that value. Designed for use in test messages, -0 is rendered as '-0', strings are wrapped in single quotes, and Arrays and Objects are passed through JSON.stringify.
 *
 * @example
 *
 * ``` javascript
 * import defaultValue from 'default-value';
 *
 * defaultValue(-0);
 * // => "-0"
 *
 * defaultValue('foo');
 * // => "'foo'"
 *
 * defaultValue({x: 1});
 * // => "{"x": 1}"
 *
 * defaultValue({x: 1}, {beautify: true});
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
module.exports = (value, settings = {}) => {
	if (Object.is(value, -0)) {
		return '-0';
	}
	if (value instanceof String || typeof value === 'string') {
		return '\'' + value + '\'';
	}
	if (Array.isArray(value) || (value && value.constructor === Object)) {
		if (settings.beautify) {
			return JSON.stringify(value, null, 4);
		}
		return JSON.stringify(value);
	}

	return value + '';
};
