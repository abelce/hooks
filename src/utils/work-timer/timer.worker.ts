import isBrowser from '../isBrowser';
import { MsgType } from './types';

if (isBrowser()) {
  const webWorker = self;

  webWorker.addEventListener('message', (message: MessageEvent) => {
    const data = message.data;
    switch (data.type) {
      case MsgType.Create: {
        const $timer = setTimeout(() => {
          webWorker.postMessage({
            taskId: data.taskId,
            type: MsgType.Execute,
          });

          clearTimeout($timer);
        }, data.wait);

        webWorker.postMessage({
          taskId: data.taskId,
          timer: $timer,
          type: MsgType.Create,
        });
        break;
      }
      case MsgType.Clear: {
        clearTimeout(data.timerId);
        webWorker.postMessage({
          taskId: data.taskId,
          type: MsgType.Clear,
        });
        break;
      }
    }
  });
}
export default null as any;
