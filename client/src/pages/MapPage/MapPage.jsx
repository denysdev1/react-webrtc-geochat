import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import { Marker } from '../../components/Marker';
import { UserInfoCard } from '../../components/UserInfoCard';
import { Messenger } from '../../components/Messenger/Messenger';
import { VideoRooms } from '../../components/VideoRooms/VideoRooms';
import './MapPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MapPage = () => {
  const navigate = useNavigate();
  const { myLocation, onlineUsers, cardChosenOption } = useSelector(
    (state) => state.map
  );

  useEffect(() => {
    if (!onlineUsers) {
      navigate('/');
    }
  }, []);

  console.log(onlineUsers);

  const defaultMapProps = {
    center: {
      lat: myLocation?.lat,
      lng: myLocation?.lng,
    },
    zoom: 11,
  };

  return (
    <div className='map_page_container'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultMapProps.center}
        defaultZoom={defaultMapProps.zoom}
      >
        {onlineUsers.map((user) => (
          <Marker
            key={user.username}
            lat={user.coords.lat}
            lng={user.coords.lng}
            myself={user.myself}
            socketId={user.socketId}
            username={user.username}
          />
        ))}
      </GoogleMapReact>
      <Messenger />
      {cardChosenOption && (
        <UserInfoCard
          socketId={cardChosenOption.socketId}
          username={cardChosenOption.username}
          userLocation={cardChosenOption.coords}
        />
      )}
      <VideoRooms />
    </div>
  );
};
