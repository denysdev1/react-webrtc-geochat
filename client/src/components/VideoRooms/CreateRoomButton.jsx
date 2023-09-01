import { useSelector } from 'react-redux';
import { createVideoRoom } from '../../store/actions/videoRoomActions';
import callIcon from '/images/call-icon.svg';

export const CreateRoomButton = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);

  const handleCreateRoom = () => {
    if (inRoom) {
      return alert('You are already in some room');
    }

    createVideoRoom();
  };

  return (
    <img
      src={callIcon}
      className='map_page_card_img'
      onClick={handleCreateRoom}
    />
  );
};
