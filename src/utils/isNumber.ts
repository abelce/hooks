import toString from './toString';

export default (num: unknown) => toString.call(num) === '[object Number]';
