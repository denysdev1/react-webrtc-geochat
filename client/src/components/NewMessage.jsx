import { useState } from "react";
import { sendChatMesssage } from "../store/actions/messengerActions";
import { useSelector } from "react-redux";

export const NewMessage = ({ socketId }) => {
  const { onlineUsers } = useSelector((state) => state.map);
  const [message, setMessage] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);

  const proceedChatMessage = () => {
    if (onlineUsers.find((user) => user.socketId === socketId)) {
      sendChatMesssage(socketId, message);
    } else {
      setInputDisabled(true);
    }
  };

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.code === "Enter" && message.trim().length) {
      proceedChatMessage();
      setMessage("");
    }
  };

  return (
    <div className="chatbox_new_message_container">
      <input
        type="text"
        className="chatbox_new_message_input"
        placeholder="Type your message!"
        value={message}
        disabled={inputDisabled}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </div>
  );
};
