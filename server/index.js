import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { PeerServer } from 'peer';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.get('/', (req, res) => {
  res.send('This is get request!');
});

let onlineUsers = {};
let videoRooms = {};

io.on('connection', (socket) => {
  socket.on('user-login', (data) => loginEventHandler(socket, data));
  socket.on('chat-message', (data) => chatMessageHandler(socket, data));
  socket.on('video-room-create', (data) =>
    createVideoRoomHandler(socket, data)
  );
  socket.on('video-room-join', (data) => videoRoomJoinHandler(socket, data));
  socket.on('video-room-leave', (data) => videoRoomLeaveHandler(socket, data));

  socket.on('disconnect', () => {
    disconnectEventHandler(socket);
  });
});

const peerServer = PeerServer({ port: 9000, path: '/peer' });

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function disconnectEventHandler(socket) {
  checkIfUserIsInCall(socket);
  removeOnlineUser(socket.id);
  broadcastDisconnectedUserDetails(socket.id);
}

function chatMessageHandler(socket, data) {
  const { receiverSocketId, content, id } = data;

  if (onlineUsers[receiverSocketId]) {
    io.to(receiverSocketId).emit('chat-message', {
      senderSocketId: socket.id,
      content,
      id,
    });
  }
}

function createVideoRoomHandler(socket, data) {
  const { peerId, newRoomId } = data;

  videoRooms[newRoomId] = {
    participants: [
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ],
  };

  broadcastVideoRooms();
}

function videoRoomJoinHandler(socket, data) {
  const { roomId, peerId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((p) => {
      socket.to(p.socketId).emit('video-room-init', {
        newParticipantPeerId: peerId,
      });
    });

    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ];

    broadcastVideoRooms();
  }
}

function videoRoomLeaveHandler(socket, data) {
  const { roomId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
      (user) => user.socketId !== socket.id
    );
  }

  if (videoRooms[roomId].participants.length) {
    socket
      .to(videoRooms[roomId].participants[0].socketId)
      .emit('video-call-disconnect');
  }

  if (!videoRooms[roomId].participants.length) {
    delete videoRooms[roomId];
  }

  broadcastVideoRooms();
}

function removeOnlineUser(id) {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
}

function checkIfUserIsInCall(socket) {
  Object.entries(videoRooms).forEach(([key, value]) => {
    const participant = value.participants.find(
      (p) => p.socketId === socket.id
    );

    if (participant) {
      removeUserFromVideoRoom(socket.id, key);
    }
  });
}

function removeUserFromVideoRoom(socketId, roomId) {
  videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
    (p) => p.socketId !== socketId
  );

  if (!videoRooms[roomId].participants.length) {
    delete videoRooms[roomId];
  } else {
    io.to(videoRooms[roomId].participants[0].socketId).emit(
      'video-call-disconnect'
    );
  }

  broadcastVideoRooms();
}

function broadcastDisconnectedUserDetails(disconnectedUserSocketId) {
  io.to('logged-users').emit('user-disconnected', disconnectedUserSocketId);
}

function broadcastVideoRooms() {
  io.to('logged-users').emit('video-rooms', videoRooms);
}

function loginEventHandler(socket, data) {
  socket.join('logged-users');

  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };

  io.to('logged-users').emit('online-users', convertOnlineUsersToArray());
  broadcastVideoRooms();
}

function convertOnlineUsersToArray() {
  const onlineUsersArray = [];

  Object.entries(onlineUsers).forEach(([key, value]) => {
    onlineUsersArray.push({
      socketId: key,
      username: value.username,
      coords: value.coords,
    });
  });

  return onlineUsersArray;
}
