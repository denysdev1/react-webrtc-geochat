import { Messages } from "./Messages";
import { Navbar } from "./Navbar";
import { NewMessage } from "./NewMessage";

export const Chatbox = (props) => {
  return (
    <div className="chatbox_container">
      <Navbar {...props} />
      <Messages socketId={props.socketId} />
      <NewMessage socketId={props.socketId} />
    </div>
  );
};
