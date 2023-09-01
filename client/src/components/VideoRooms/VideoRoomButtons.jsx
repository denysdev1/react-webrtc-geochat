import { leaveVideoRoom } from '../../store/actions/videoRoomActions';
import disconnectIcon from '/images/call-disconnect-icon.svg';
import micIcon from '/images/mic-icon.svg';
import micOffIcon from '/images/mic-off-icon.svg';
import cameraIcon from '/images/camera-icon.svg';
import cameraOffIcon from '/images/camera-off-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsMicOn,
  setIsCameraOn,
} from '../../realtime-communication/videoRoomsSlice';

export const VideoRoomButtons = ({ inRoom }) => {
  const { isMicOn, isCameraOn, localStream } = useSelector(
    (state) => state.videoRooms
  );
  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    leaveVideoRoom(inRoom);
  };

  const toggleMute = () => {
    localStream.getAudioTracks()[0].enabled = !isMicOn;
    dispatch(setIsMicOn(!isMicOn));
  };

  const toggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !isCameraOn;
    dispatch(setIsCameraOn(!isCameraOn));
  };

  return (
    <div className='m_page_v_rooms_video_buttons_container'>
      <button onClick={toggleMute} className='m_page_v_rooms_video_button'>
        <img src={isMicOn ? micIcon : micOffIcon} width='25px' height='25px' />
      </button>
      <button onClick={handleLeaveRoom} className='m_page_v_rooms_video_button'>
        <img src={disconnectIcon} width='25px' height='25px' />
      </button>
      <button onClick={toggleCamera} className='m_page_v_rooms_video_button'>
        <img
          src={isCameraOn ? cameraIcon : cameraOffIcon}
          width='25px'
          height='25px'
        />
      </button>
    </div>
  );
};
