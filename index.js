const isArray = Array.isArray;
const isObject = (value) => value.constructor === Object;
const slice = Array.prototype.slice;
const sameValue = Object.is;
const isNative = (value) => (value + '').includes('[native code]');
const HIDDEN_CONTENT = '{…}';

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

const bigIntString = (value) => {
	if (sameValue(value, -0n)) {
		return '-0n';
	}

	return value.toLocaleString() + 'n';
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
		.replace('ƒ(', 'ƒ (') + HIDDEN_CONTENT;
};

const nonNativeInstanceString = (value) => {
	if (value.toString) {
		const string = value.toString();

		if (string !== '[object Object]') {
			return string;
		}
	}

	return `[object ${value.constructor.name}]`;
};

const addValue = (output, value, key, indentString, type, settings, isAnArray) => {
	if (output.length !== 1) {
		output += settings.separator;
	}
	else if (!isAnArray && !settings.beautify) {
		output += ' ';
	}

	if (isAnArray || type === 'set') {
		return output + (
			(output.length === 1 || value.charAt(0) !== '{') ?
				indentString :
				settings.space
		) + value;
	}

	return output + indentString + '"' + key + '": ' + value;
};

const stringify = (value, indent, settings, type) => {
	const indentString = settings.beautify ? buildPrefix(indent) : '';
	const isAnArray = type === 'array' || type === 'typedarray' || type === 'arraylike';
	let output = isAnArray ? '[' : '{';

	if (isAnArray || type === 'object') {
		for (const key in value) {
			output = addValue(
				output,
				processValue(value[key], indent, settings),
				key,
				indentString,
				type,
				settings,
				isAnArray
			);
		}
	}
	else {
		for (const key of value) {
			output = addValue(
				output,
				processValue(type === 'map' ? key[1] : key, indent, settings),
				key[0],
				indentString,
				type,
				settings,
				isAnArray
			);
		}
	}

	if (output.length !== 1) {
		if (settings.beautify) {
			output += buildPrefix(indent - 1);
		}
		else if (!isAnArray) {
			output += ' ';
		}
	}

	return output + (isAnArray ? ']' : '}');
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

		if (value instanceof Set) {
			return 'set';
		}

		if (value instanceof Map) {
			return 'map';
		}

		if (value instanceof WeakSet) {
			return 'weakset';
		}

		if (value instanceof WeakMap) {
			return 'weakmap';
		}

		if (
			value instanceof Int8Array ||
			value instanceof Uint8Array ||
			value instanceof Uint8ClampedArray ||
			value instanceof Int16Array ||
			value instanceof Uint16Array ||
			value instanceof Int32Array ||
			value instanceof Uint32Array ||
			value instanceof BigInt64Array ||
			value instanceof BigUint64Array ||
			value instanceof Float32Array ||
			value instanceof Float64Array
		) {
			return 'typedarray';
		}

		if (value.constructor !== undefined && !isNative(value.constructor)) {
			return 'constructor';
		}
	}
};

const processValue = (value, indent, settings) => {
	const type = getType(value);

	switch (type) {
		case 'string':
			return `"${value}"`;
		case 'number':
			return numberString(value);
		case 'bigint':
			return bigIntString(value);
		case 'symbol':
			return symbolString(value);
		case 'function':
			return functionString(value);
		case 'array':
		case 'object':
		case 'arraylike':
			return stringify(value, indent + 1, settings, type);
		case 'typedarray':
		case 'set':
		case 'map':
			return value.constructor.name + ' ' + stringify(value, indent + 1, settings, type);
		case 'weakset':
		case 'weakmap':
			return value.constructor.name + ' ' + HIDDEN_CONTENT;
		case 'constructor':
			return nonNativeInstanceString(value);
		default:
			return value + '';
	}
};

const defaultSettings = {
	space: '',
	separator: ', ',
	beautify: false
};

const beautifySettings = {
	space: ' ',
	separator: ',',
	beautify: true
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
module.exports = (value, settings = {}) => {
	return processValue(value, 0, settings.beautify === true ? beautifySettings : defaultSettings);
};
