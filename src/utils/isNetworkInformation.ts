import toString from './toString';

export default (obj: any) =>
  toString.call(obj) === '[object NetworkInformation]';
