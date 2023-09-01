import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../pages/MapPage/mapSlice';
import messengerReducer from '../store/messengerSlice';
import videoRoomsReducer from '../realtime-communication/videoRoomsSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    messenger: messengerReducer,
    videoRooms: videoRoomsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          'videoRooms/setLocalStream',
          'videoRooms/setRemoteStream',
        ],
        ignorePaths: ['videoRooms.localStream', 'videoRooms.remoteStream'],
      },
    }),
});

export default store;
