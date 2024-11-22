const isNativeCode = (value: unknown): boolean => (`${ value }`).includes('[native code]');

export default isNativeCode;
