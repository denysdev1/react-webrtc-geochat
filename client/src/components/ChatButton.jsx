import { useDispatch } from "react-redux";
import chatIcon from "/images/chat-icon.svg";
import { addChatbox } from "../store/messengerSlice";

export const ChatButton = ({ socketId, username }) => {
  const dispatch = useDispatch();
  const handleAddChatBox = () => {
    dispatch(addChatbox({ username, socketId }));
  };

  return (
    <img
      src={chatIcon}
      className="map_page_card_img"
      onClick={handleAddChatBox}
    ></img>
  );
};
