import { useSelector } from "react-redux";
import { Chatbox } from "../Chatbox";
import "./Messenger.css";

export const Messenger = () => {
  const { chatboxes } = useSelector(state => state.messenger);

  return (
    <div className="messenger_container">
      {chatboxes?.map((chatbox) => (
        <Chatbox key={chatbox.socketId} socketId={chatbox.socketId} username={chatbox.username} />
      ))}
    </div>
  );
};
