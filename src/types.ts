export type Noop<T extends any[] = []> = (...args: T) => any;
export type PromiseNoop<T extends any[] = []> = (...args: T) => Promise<any>;
