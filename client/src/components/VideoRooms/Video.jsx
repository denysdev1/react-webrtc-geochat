import { useEffect, useRef } from 'react';

export const Video = ({ stream, muted }) => {
  const videoEl = useRef(null);

  useEffect(() => {
    const video = videoEl.current;

    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div className='map_page_v_rooms_video_container'>
      <video
        width='98%'
        height='98%'
        playsInline
        autoPlay
        muted={muted}
        ref={videoEl}
      ></video>
    </div>
  );
};
