import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMyLocation } from "../MapPage/mapSlice";
import { connectWithSocketIOServer } from "../../socket-connection/socketConn";

import { LoginButton } from "../../components/LoginButton";
import { LoginInput } from "../../components/LoginInput";
import { Logo } from "../../components/Logo";
import { proceedWithLogin } from "../../store/actions/loginPageActions";
import { connectWithPeerServer } from "../../realtime-communication/webRTCHandler";
import "./LoginPage.css";

const isUsernameValid = (username) => {
  return (
    username.trim().length &&
    username.trim().length <= 10 &&
    !username.includes(" ")
  );
};

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myLocation = useSelector((state) => state.map.myLocation);
  const [username, setUsername] = useState("");
  const [hasErrorOccured, setHasErrorOccured] = useState(false);

  const handleLogin = () => {
    proceedWithLogin({
      username,
      coords: {
        lat: myLocation.lat,
        lng: myLocation.lng,
      },
    });
    navigate("/map");
  };

  const onSuccess = (position) => {
    dispatch(
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  const onError = () => {
    setHasErrorOccured(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      locationOptions
    );
  }, []);

  useEffect(() => {
    if (myLocation) {
      connectWithSocketIOServer();
      connectWithPeerServer();
    }
  }, [myLocation]);

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <Logo />
        <LoginInput username={username} setUsername={setUsername} />
        <LoginButton
          disabled={!isUsernameValid(username) || hasErrorOccured}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
};
