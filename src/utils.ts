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

const FRAMEWORK_COMPONENTS = [
  'express',
  'koa',
  'egg',
  'nextjs',
  'nuxtjs',
  'nestjs',
  'flask',
  'django',
  'laravel',
  'thinkphp',
];

const BASE_COMPONENTS = ['scf', 'apigateway', 'cos', 'layer', 'cdn', 'vpc', 'postgresql'];
const COMPONENTS = [...BASE_COMPONENTS, ...FRAMEWORK_COMPONENTS];

const isBaseComponent = (name: string) => {
  return BASE_COMPONENTS.indexOf(name) !== -1;
};

const isFrameworkComponent = (name = 'framework') => {
  return FRAMEWORK_COMPONENTS.indexOf(name) !== -1;
};

export {
  isObject,
  deepClone,
  typeOf,
  isUndefined,
  isEmptyObject,
  COMPONENTS,
  isBaseComponent,
  isFrameworkComponent,
};
