import { useSelector } from 'react-redux';
import { Video } from './Video';
import { VideoRoomButtons } from './VideoRoomButtons';

export const ParticipantsVideos = () => {
  const { localStream, inRoom, remoteStream } = useSelector(
    (state) => state.videoRooms
  );

  return (
    <div className='map_page_v_rooms_videos_container'>
      {inRoom && <VideoRoomButtons inRoom={inRoom} />}
      {inRoom && localStream && <Video stream={localStream} muted />}
      {inRoom && remoteStream && <Video stream={remoteStream} muted />}
    </div>
  );
};
