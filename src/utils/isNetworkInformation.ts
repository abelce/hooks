import toString from './toString';

export default (target: unknown) =>
  toString.call(target) === '[object NetworkInformation]';
