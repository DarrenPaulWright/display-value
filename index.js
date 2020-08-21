const isArray = Array.isArray;
const isObject = (value) => value.constructor === Object;
const slice = Array.prototype.slice;
const sameValue = Object.is;
const isNative = (value) => (value + '').includes('[native code]');

const buildPrefix = (indent) => {
	let output = '\n';

	for (let i = 0; i < indent; i++) {
		output += '    ';
	}

	return output;
};

const numberString = (value) => {
	if (!isFinite(value)) {
		return value + '';
	}

	if (sameValue(value, -0)) {
		return '-0';
	}

	return value.toLocaleString();
};

const symbolString = (value) => {
	if (value.description !== undefined) {
		return 'Symbol(' + value.description + ')';
	}

	return value.toString();
};

const functionString = (value) => {
	const string = value + '';

	if (value.name !== '' && isNative(string)) {
		return value.name;
	}

	return string
		.slice(0, string.indexOf('{'))
		.replace('function', 'ƒ')
		.replace('ƒ(', 'ƒ (') + '{…}';
};

const nonNativeInstanceString = (value) => {
	if (value.toString) {
		const string = value.toString();

		if (string !== '[object Object]') {
			return string;
		}
	}

	return '[object ' + value.constructor.name + ']';
};

const stringify = (value, indent, settings, isArray) => {
	const indentString = settings.beautify === true ? buildPrefix(indent) : '';
	const SPACE = settings.beautify === true ? ' ' : '';
	const start = isArray ? '[' : '{';
	const end = isArray ? ']' : '}';
	const separator = settings.beautify === true ? ',' : ', ';

	let output = start;

	for (let key in value) {
		if (output !== start) {
			output += separator;
		}
		else if (!isArray && settings.beautify !== true) {
			output += ' ';
		}

		const result = processValue(value[key], indent, settings);

		if (isArray) {
			output += ((output === start || result.charAt(0) !== '{') ? indentString : SPACE) + result;
		}
		else {
			output += indentString + '"' + key + '": ' + result;
		}
	}

	if (settings.beautify === true && output !== start) {
		output += buildPrefix(indent - 1);
	}
	else if (!isArray && output !== start) {
		output += ' ';
	}

	return output + end;
};

const getType = (value) => {
	const type = typeof value;

	if (type !== 'object') {
		return type;
	}

	if (value !== null && value !== undefined) {
		if (value instanceof String) {
			return 'string';
		}

		if (isArray(value)) {
			return 'array';
		}

		if (isObject(value) || value.toJSON && !(value instanceof Date)) {
			if (value.length !== undefined) {
				return 'arraylike';
			}

			return 'object';
		}

		if (value.constructor !== undefined && !isNative(value.constructor)) {
			return 'constructor';
		}
	}
};

const processValue = (value, indent, settings) => {
	switch (getType(value)) {
		case 'string':
			return '"' + value + '"';
		case 'number':
			return numberString(value);
		case 'symbol':
			return symbolString(value);
		case 'function':
			return functionString(value);
		case 'array':
			return stringify(value, indent + 1, settings, true);
		case 'object':
			return stringify(value, indent + 1, settings, false);
		case 'arraylike':
			return stringify(slice.call(value), indent + 1, settings, true);
		case 'constructor':
			return nonNativeInstanceString(value);
		default:
			return value + '';
	}
};

/**
 *  Designed for use in test messages, displayValue takes a javascript value and returns a human readable string representation of that value.
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
 * @arg {*} value
 * @arg {Object} [settings]
 * @arg {Boolean} [settings.beautify=false] - If true and value is an Array or Object then the output is rendered in multiple lines with indentation
 *
 * @returns {string}
 */
module.exports = (value, settings = {}) => processValue(value, 0, settings);
