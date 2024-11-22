const isObject = (value: unknown): value is object => value?.constructor === Object;

export default isObject;
