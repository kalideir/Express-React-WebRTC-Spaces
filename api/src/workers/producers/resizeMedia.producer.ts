import { resizeMediaQueue } from '..';

export default function () {
  const opts = {
    attempts: 10,
  };
  resizeMediaQueue.add({}, opts);
}
