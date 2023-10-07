import WorkerTimer from '.';

let install: WorkerTimer;

export const getWorkerTimer = () => {
  if (install) {
    return install;
  }

  return (install = new WorkerTimer());
};
