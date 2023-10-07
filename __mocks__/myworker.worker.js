class MyWorker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
}

// @ts-ignore
window.Worker = MyWorker;

export default MyWorker;
