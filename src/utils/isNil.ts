const isNil = (target: unknown): target is null | undefined =>
  target === null || target === undefined;

export default isNil;
