import { setLocalStream, setRemoteStream } from './videoRoomsSlice';
import store from '../store/store';
import { Peer } from 'peerjs';

let peer;
let peerId;

export const getPeerId = () => peerId;

export const getAccessToLocalStream = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  if (localStream) {
    store.dispatch(setLocalStream(localStream));
  }

  return Boolean(localStream);
};

export const connectWithPeerServer = () => {
  peer = new Peer(undefined, {
    host: import.meta.env.VITE_HOST,
    port: import.meta.env.VITE_PORT,
    path: '/peer',
  });

  peer.on('open', (id) => {
    peerId = id;
  });

  peer.on('call', async (call) => {
    const localStream = store.getState().videoRooms.localStream;

    call.answer(localStream);
    call.on('stream', (remoteStream) => {
      store.dispatch(setRemoteStream(remoteStream));
    });
  });
};

export const call = (data) => {
  const { newParticipantPeerId } = data;
  const localStream = store.getState().videoRooms.localStream;
  const peerCall = peer.call(newParticipantPeerId, localStream);

  peerCall.on('stream', (remoteStream) => {
    store.dispatch(setRemoteStream(remoteStream));
  });
};

export const disconnect = () => {
  for (let connection in peer.connections) {
    peer.connections[connection].forEach((c) => {
      c.peerConnection.close();

      if (c.close) {
        c.close();
      }
    });
  }

  store.dispatch(setRemoteStream(null));
};
