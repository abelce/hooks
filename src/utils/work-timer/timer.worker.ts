import { MsgType } from './types';

addEventListener('message', (message: MessageEvent) => {
  const data = message.data;
  switch (data.type) {
    case MsgType.Create: {
      const $timer = setTimeout(() => {
        postMessage({
          taskId: data.taskId,
          type: MsgType.Execute,
        });

        clearTimeout($timer);
      }, data.wait);

      postMessage({
        taskId: data.taskId,
        timer: $timer,
        type: MsgType.Create,
      });
      break;
    }
    case MsgType.Clear: {
      clearTimeout(data.timerId);
      postMessage({
        taskId: data.taskId,
        type: MsgType.Clear,
      });
      break;
    }
  }
});

export default null as any;
