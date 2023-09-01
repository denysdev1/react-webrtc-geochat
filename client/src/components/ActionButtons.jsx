import { ChatButton } from "./ChatButton";

export const ActionButtons = (props) => {
  return (
    <div className="map_page_card_buttons_container">
      <ChatButton {...props} />
    </div>
  );
};
