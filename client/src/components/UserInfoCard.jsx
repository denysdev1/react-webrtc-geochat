import { useSelector } from "react-redux";
import { calculateDistanceBetweenCords } from "../utils/getDistance";
import { ActionButtons } from "./ActionButtons";

const Label = ({ fontSize, text }) => {
  return (
    <p className="map_page_card_label" style={{ fontSize }}>
      {text}
    </p>
  );
};

export const UserInfoCard = ({ username, socketId, userLocation }) => {
  const { myLocation } = useSelector((state) => state.map);

  return (
    <div className="map_page_card_container">
      <Label text={username} fontSize="16px" />
      <Label
        text={calculateDistanceBetweenCords(myLocation, userLocation) + " km"}
        fontSize="14px"
      />
      <ActionButtons socketId={socketId} username={username} />
    </div>
  );
};
