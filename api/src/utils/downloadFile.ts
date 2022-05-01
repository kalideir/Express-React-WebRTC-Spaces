import fetch from 'node-fetch';

export default function downloadFile(url: string) {
  return fetch(url).then(x => x.arrayBuffer());
}
