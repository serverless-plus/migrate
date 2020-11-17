import { AnyObject } from './typings';

const deepClone = (obj: AnyObject): AnyObject => {
  return JSON.parse(JSON.stringify(obj));
};

const typeOf = (obj: AnyObject): string => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

const isUndefined = (val: any): boolean => {
  return val === undefined;
};

const isObject = (obj: AnyObject): boolean => {
  return typeOf(obj) === 'Object';
};

const isEmptyObject = (obj: AnyObject): boolean => {
  return Object.keys(obj).length === 0;
};

export { isObject, deepClone, typeOf, isUndefined, isEmptyObject };
