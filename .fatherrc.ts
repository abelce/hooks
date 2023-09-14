export default {
  esm: {
    type: 'babel',
    file: 'es/index',
  },
  cjs: {
    type: 'babel',
    file: 'lib/index',
    lazy: true,
  },
  pkgs: ['zhooks'],
};
