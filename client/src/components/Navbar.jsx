import { useDispatch } from 'react-redux';
import closeIcon from '/images/close-icon.svg';
import { removeChatbox } from '../store/messengerSlice';

const ChatboxLabel = ({ username }) => (
  <p className="chatbox_nav_bar_label">{username}</p>
);

const CloseButton = ({ socketId }) => {
  const dispatch = useDispatch();

  const handleCloseChatbox = () => {
    dispatch(removeChatbox(socketId));
  }

  return (
    <div className="chatbox_close_icon_container">
      <img src={closeIcon} alt="close" className="chatbox_close_icon_img" onClick={handleCloseChatbox} />
    </div>
  );
};

export const Navbar = ({ username, socketId }) => {
  return (
    <div className="chatbox_nav_bar_container">
      <ChatboxLabel username={username} />
      <CloseButton socketId={socketId} /> 
    </div>
  );
};
