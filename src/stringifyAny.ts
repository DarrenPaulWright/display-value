import { HIDDEN_CONTENT } from './constants.js';
import isArguments from './isArguments.js';
import isNativeCode from './isNativeCode.js';
import isObject from './isObject.js';
import stringifyArray from './stringifyArray.js';
import stringifyBigInt from './stringifyBigInt.js';
import stringifyFunction from './stringifyFunction.js';
import stringifyNonNativeInstance from './stringifyNonNativeInstance.js';
import stringifyNumber from './stringifyNumber.js';
import stringifyObject from './stringifyObject.js';
import stringifyString from './stringifyString.js';
import stringifySymbol from './stringifySymbol.js';
import type { IInternalSettings } from './types.js';

// eslint-disable-next-line complexity
const stringifyAny = (
	value: unknown,
	indent: number,
	settings: IInternalSettings,
	isKey = false
): string => {
	if (value !== null && value !== undefined) {
		if (typeof value === 'string' || value instanceof String) {
			return stringifyString(String(value), isKey, settings);
		}

		if (typeof value === 'number' || value instanceof Number) {
			return stringifyNumber(Number(value));
		}

		if (typeof value === 'bigint' || value instanceof BigInt) {
			return stringifyBigInt(value);
		}

		if (typeof value === 'symbol') {
			return stringifySymbol(value);
		}

		if (typeof value === 'function') {
			return stringifyFunction(value);
		}

		if (Array.isArray(value)) {
			return stringifyArray(
				value,
				'',
				indent,
				settings,
				stringifyAny
			);
		}

		if (isArguments(value)) {
			return stringifyArray(
				Array.from(value),
				'Arguments ',
				indent,
				settings,
				stringifyAny
			);
		}

		if (
			value instanceof Set ||
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
			return stringifyArray(
				Array.from(value),
				`${ value.constructor.name } `,
				indent,
				settings,
				stringifyAny
			);
		}

		if (isObject(value)) {
			return stringifyObject(
				Object.entries(value),
				'',
				indent,
				settings,
				stringifyAny
			);
		}

		if (value instanceof Map) {
			return stringifyObject(
				[...value.entries()],
				`${ value.constructor.name } `,
				indent,
				settings,
				stringifyAny
			);
		}

		if (
			value instanceof WeakSet ||
			value instanceof WeakMap
		) {
			return `${ value.constructor.name } ${ HIDDEN_CONTENT }`;
		}

		if (value.constructor !== undefined && !isNativeCode(value.constructor)) {
			return stringifyNonNativeInstance(value);
		}
	}

	return `${ value }`;
};

export default stringifyAny;
