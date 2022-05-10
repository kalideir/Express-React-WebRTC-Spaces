import { useEffect, useRef } from 'react';

const StreamPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);
  return <video style={{ width: '100%' }} ref={videoRef} autoPlay muted={true} />;
};

export default StreamPlayer;
