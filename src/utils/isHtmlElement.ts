export default (target: unknown): target is HTMLElement =>
  target instanceof HTMLElement;
