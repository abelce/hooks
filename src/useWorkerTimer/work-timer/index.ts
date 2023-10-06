import { Noop } from '@/types';
import isNumber from '@/utils/isNumber';
import TimerWorker from './timer.worker';
import { MsgType, Task, WorkMsg } from './types';

let taskSeed = 1;

const createTask = (): Task => {
  return {
    taskId: taskSeed++,
  };
};

const createMsg = (type: MsgType, taskId: number): WorkMsg => {
  return {
    type,
    taskId,
  };
};

class WorkTimer {
  private taskMap = new Map<number, Task>();
  private worker: Worker = new TimerWorker();

  constructor() {
    this.init();
  }

  private init() {
    this.onMessage();
  }

  public setTimeout(callback: Noop, wait: number = 0) {
    const newTask = createTask();
    newTask.handler = callback;
    this.taskMap.set(newTask.taskId, newTask);

    const msg = createMsg(MsgType.Create, newTask.taskId);
    msg.wait = wait;

    this.worker.postMessage(msg);

    return () => {
      this.clear(newTask.taskId);
    };
  }

  public clear(id: number) {
    if (isNumber(id) && this.taskMap.has(id)) {
      const msg = createMsg(MsgType.Create, id);
      msg.timer = this.taskMap.get(id)?.timer;
      this.worker.postMessage(msg);
    }
  }

  private onMessage() {
    this.worker.onmessage = (event: MessageEvent) => {
      const data = event.data as WorkMsg;
      switch (data.type) {
        case MsgType.Create: {
          const task = this.taskMap.get(data.taskId);
          if (!task) {
            return;
          }
          task.timer = data.timer;
          this.taskMap.set(data.taskId, task);
          break;
        }
        case MsgType.Execute: {
          const task = this.taskMap.get(data.taskId);
          if (!task) {
            return;
          }
          task.handler?.();
          this.taskMap.set(data.taskId, task);
          break;
        }
        case MsgType.Clear: {
          this.taskMap.delete(data.taskId);
          break;
        }
      }
    };
  }
}

export default WorkTimer;
