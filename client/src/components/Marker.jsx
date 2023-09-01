import { useDispatch } from "react-redux";
import locationIcon from "/images/location-icon.svg";
import { setCardChosenOption } from "../pages/MapPage/mapSlice";

export const Marker = ({ myself, socketId, username, lat, lng }) => {
  const dispatch = useDispatch();

  const handleOptionChoose = () => {
    if (!myself) {
      dispatch(
        setCardChosenOption({
          socketId,
          username,
          coords: {
            lat,
            lng,
          },
        })
      );
    }
  };

  return (
    <div className="map_page_marker_container" onClick={handleOptionChoose}>
      <img
        src={locationIcon}
        alt="username"
        className="map_page_marker_img"
      ></img>
      <p className="map_page_marker_text">{myself ? "Me" : username}</p>
    </div>
  );
};
