import { v4 as uuid } from 'uuid';
import { addChatMessage, addChatbox } from '../messengerSlice';
import * as socketConn from '../../socket-connection/socketConn';
import store from '../store';

export const sendChatMesssage = (receiverSocketId, content) => {
  const message = {
    content,
    receiverSocketId,
    id: uuid(),
  };

  socketConn.sendChatMesssage(message);

  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      myMessage: true,
      content,
      id: message.id,
    })
  );
};

export const chatMessageHandler = (messageData) => {
  store.dispatch(
    addChatMessage({
      socketId: messageData.senderSocketId,
      content: messageData.content,
      myMessage: false,
      id: messageData.id,
    })
  );

  openChatboxIfClosed(messageData.senderSocketId);
};

const openChatboxIfClosed = (socketId) => {
  const chatbox = store
    .getState()
    .messenger.chatboxes.find((c) => c.socketId === socketId);
  const username = store
    .getState()
    .map.onlineUsers.find((user) => user.socketId === socketId)?.username;

  if (!chatbox) {
    store.dispatch(
      addChatbox({
        socketId,
        username,
      })
    );
  }
};
