import { Noop } from '@/types';

export enum MsgType {
  Create,
  Execute,
  Clear,
}

export type Task = {
  taskId: number;
  handler?: Noop;
  timer?: number;
};

export type WorkMsg = {
  taskId: number;
  type: MsgType;
  wait?: number;
  timer?: number;
};
