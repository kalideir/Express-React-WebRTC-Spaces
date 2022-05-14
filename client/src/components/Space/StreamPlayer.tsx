import { useEffect, useRef } from 'react';
import Peer from 'simple-peer';

const Video = (props: { peer: Peer.Instance }) => {
  const ref = useRef<any | null>(null);

  useEffect(() => {
    props.peer.on('stream', (stream: unknown) => {
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return <video style={{ width: '100%', height: '100%' }} playsInline autoPlay ref={ref} />;
};

export default Video;
