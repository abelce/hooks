import * as hooks from '..';

describe('let-hooks', () => {
  it('hooks should be defined', () => {
    Object.values(hooks).forEach((hook) => {
      expect(hook).toBeDefined();
    });
  });
});
