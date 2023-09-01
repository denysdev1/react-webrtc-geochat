import io from 'socket.io-client';
import {
  onlineUsersHandler,
  userDisconnectedHandler,
} from '../store/actions/usersActions';
import { chatMessageHandler } from '../store/actions/messengerActions';
import { videoRoomsListHandler } from '../store/actions/videoRoomActions';
import { call, disconnect } from '../realtime-communication/webRTCHandler';

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(import.meta.env.VITE_SERVER_URL);

  socket.on('online-users', (usersData) => {
    onlineUsersHandler(socket.id, usersData);
  });

  socket.on('chat-message', (messageData) => {
    chatMessageHandler(messageData);
  });

  socket.on('video-rooms', (videoRooms) => {
    videoRoomsListHandler(videoRooms);
  });

  socket.on('video-room-init', (data) => {
    call(data);
  });

  socket.on('video-call-disconnect', () => {
    disconnect();
  });

  socket.on('user-disconnected', (disconnectedUserSocketId) => {
    userDisconnectedHandler(disconnectedUserSocketId);
  });
};

export const login = (data) => {
  socket.emit('user-login', data);
};

export const sendChatMesssage = (data) => {
  socket.emit('chat-message', data);
};

export const createVideoRoom = (data) => {
  socket.emit('video-room-create', data);
};

export const joinVideoRoom = (data) => {
  socket.emit('video-room-join', data);
};

export const leaveVideoRoom = (data) => {
  socket.emit('video-room-leave', data);
};
